import jsPDF from "jspdf";

/** Supply values from the saved transaction, never from the current order draft. */
export interface ReceiptTransaction {
  id: string | number;
  tnxType: string;
  title: string;
  amt?: number;
  date?: Date | string;
  receiptNumber?: string;
  orderId?: string;
  paymentReference?: string;
  paymentMethod?: string;
  paymentStatus?: "successful" | "pending" | "failed" | "refunded";
  customerName?: string;
  deliveryAddress?: string;
  fuelType?: string;
  quantityLitres?: number;
  pricePerLitre?: number;
  subtotal?: number;
  deliveryFee?: number;
  serviceCharge?: number;
  tax?: number;
  discount?: number;
  walletCredit?: number;
}

interface ReceiptAssets {
  font: string;
  logo: Uint8Array;
}

const money = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(value);

function receiptDate(value: ReceiptTransaction["date"]) {
  if (!value) return "Not provided";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not provided";
  // Date-only records must not acquire an invented payment time.
  const dateOnly = typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
  return new Intl.DateTimeFormat("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(!dateOnly && { hour: "2-digit", minute: "2-digit" }),
    timeZone: "Africa/Lagos",
  }).format(date) + (dateOnly ? "" : " WAT");
}

/** Text-based PDF: independent of page styles, viewport size and hidden DOM. */
export function createReceiptPdf(transaction: ReceiptTransaction, assets: ReceiptAssets) {
  const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
  pdf.addFileToVFS("DejaVuSans.ttf", assets.font);
  pdf.addFont("DejaVuSans.ttf", "Receipt", "normal");
  pdf.setFont("Receipt", "normal");
  pdf.setProperties({ title: `FuelTap receipt ${transaction.id}`, author: "FuelTap" });

  const topUp = transaction.tnxType === "Account Top-up";
  const paid = transaction.paymentStatus === "successful";
  const title = topUp ? "Wallet top-up receipt" : "Fuel purchase receipt";
  const reference = transaction.receiptNumber ?? `FT-${transaction.id}`;
  const filename = `FuelTap-Receipt-${String(reference).replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 80)}.pdf`;
  let y = 53;

  function text(value: string, x: number, at: number, size = 10, color = "#172D29") {
    pdf.setFontSize(size);
    pdf.setTextColor(color);
    pdf.text(value, x, at);
  }

  function header() {
    pdf.setFillColor("#147D64");
    pdf.rect(0, 0, 210, 3, "F");
    const logo = pdf.getImageProperties(assets.logo);
    const width = Math.min(38, (logo.width / logo.height) * 16);
    pdf.addImage(assets.logo, "PNG", 18, 14, width, width * logo.height / logo.width);
    text("RECEIPT", 151, 21, 15);
    text("FuelTap", 18, 39, 8, "#65736F");
    pdf.setDrawColor("#DCE5E1");
    pdf.line(18, 44, 192, 44);
  }

  function space(height: number) {
    if (y + height > 260) {
      pdf.addPage();
      header();
      y = 54;
    }
  }

  function section(label: string) {
    space(22);
    y += 4;
    text(label.toUpperCase(), 18, y, 9, "#147D64");
    y += 5;
  }

  function row(label: string, value: string | undefined) {
    if (!value?.trim()) return;
    pdf.setFontSize(10);
    const lines: string[] = pdf.splitTextToSize(value, 108);
    // Split even unusually long addresses/references across pages safely.
    for (let index = 0; index < lines.length; index += 30) {
      const chunk = lines.slice(index, index + 30);
      const height = Math.max(6.5, chunk.length * 4.5 + 2);
      space(height);
      text(index === 0 ? label : `${label} (cont.)`, 18, y, 9, "#65736F");
      chunk.forEach((line, i) => text(line, 82, y + i * 4.5));
      y += height;
    }
  }

  function amountRow(label: string, value?: number) {
    if (value !== undefined && Number.isFinite(value)) row(label, money(value));
  }

  header();
  text(title, 18, y, 20);
  y += 10;
  text(paid ? "TOTAL PAID" : "TRANSACTION AMOUNT", 18, y, 8, "#65736F");
  y += 10;
  text(transaction.amt !== undefined && Number.isFinite(transaction.amt) ? money(transaction.amt) : "Not provided", 18, y, 26);
  y += 10;

  section("Receipt details");
  row("Receipt number", reference);
  row("Transaction ID", String(transaction.id));
  row("Order ID", transaction.orderId);
  row("Transaction date", receiptDate(transaction.date));
  row("Payment status", transaction.paymentStatus ? {
    successful: "Paid", pending: "Pending", failed: "Failed", refunded: "Refunded",
  }[transaction.paymentStatus] : "Not provided");
  row("Payment method", transaction.paymentMethod ?? (topUp ? transaction.title : undefined));
  row("Payment reference", transaction.paymentReference);

  if (transaction.customerName || (!topUp && transaction.deliveryAddress)) {
    section("Customer");
    row("Customer name", transaction.customerName);
    if (!topUp) row("Deliver to", transaction.deliveryAddress);
  }

  section(topUp ? "Wallet details" : "Purchase details");
  row("Description", topUp ? "Wallet top-up" : "Fuel purchase");
  if (topUp) {
    amountRow("Wallet credit", transaction.walletCredit);
  } else {
    row("Supplier", transaction.title);
    row("Fuel type", transaction.fuelType);
    if (transaction.quantityLitres !== undefined) row("Quantity", `${transaction.quantityLitres} litres`);
    amountRow("Price per litre", transaction.pricePerLitre);
    amountRow("Fuel subtotal", transaction.subtotal);
    amountRow("Delivery fee", transaction.deliveryFee);
    amountRow("Service charge", transaction.serviceCharge);
    amountRow("Tax", transaction.tax);
    amountRow("Discount", transaction.discount === undefined ? undefined : -transaction.discount);
  }

  space(26);
  y += 3;
  pdf.setDrawColor("#DCE5E1");
  pdf.line(18, y, 192, y);
  y += 9;
  amountRow(paid ? "Total paid" : "Transaction amount", transaction.amt);
  text(topUp ? "This records a wallet transaction, not a fuel delivery." : "Payment status does not confirm delivery.", 18, y + 3, 8, "#65736F");

  const pages = pdf.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    pdf.setPage(page);
    pdf.setDrawColor("#DCE5E1");
    pdf.line(18, 269, 192, 269);
    text("Thank you for choosing FuelTap.", 18, 277, 9);
    text("Receipt enquiries: support@mails.fueltap.com", 18, 283, 8, "#65736F");
    text(`${page} / ${pages}`, 180, 283, 8, "#65736F");
  }

  return { pdf, filename };
}

let assetPromise: Promise<ReceiptAssets> | undefined;

function loadAssets() {
  assetPromise ??= Promise.all([
    fetch("/fonts/DejaVuSans.ttf"),
    fetch("/logo.png"),
  ]).then(async ([fontResponse, logoResponse]) => {
    if (!fontResponse.ok || !logoResponse.ok) throw new Error("Unable to load receipt branding");
    const [fontBuffer, logoBuffer] = await Promise.all([
      fontResponse.arrayBuffer(), logoResponse.arrayBuffer(),
    ]);
    const bytes = new Uint8Array(fontBuffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i += 8192) {
      binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
    }
    return { font: btoa(binary), logo: new Uint8Array(logoBuffer) };
  }).catch((error) => {
    assetPromise = undefined;
    throw error;
  });
  return assetPromise;
}

export async function exportReceipt(transaction: ReceiptTransaction, mode: "download" | "share") {
  const { pdf, filename } = createReceiptPdf(transaction, await loadAssets());
  const file = new File([pdf.output("blob")], filename, { type: "application/pdf" });
  if (mode === "share" && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ title: "FuelTap Receipt", files: [file] });
      return;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      // Download if sharing is unavailable or browser activation has expired.
    }
  }
  pdf.save(filename);
}
