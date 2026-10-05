"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import type { ReceiptTransaction } from "@/lib/helpers/receipt";

// Placeholder receipt data for the current static checkout.
// Pass the saved transaction through props when payment data is connected.
const placeholderOrder: ReceiptTransaction = {
  id: "849472",
  orderId: "849472",
  tnxType: "Fuel Purchase",
  title: "Total Energies",
  fuelType: "Diesel",
  quantityLitres: 20,
  pricePerLitre: 988,
  subtotal: 20 * 988,
  deliveryAddress: "13 Ikoyi Street",
  customerName: "John Doe",
  deliveryFee: 2500,
  serviceCharge: 50,
  amt: 20 * 988 + 2500 + 50,
  date: "2026-10-05T10:40:00+01:00",
  paymentStatus: "successful",
  paymentMethod: "FuelTap Wallet",
  paymentReference: "FT-PAY-849472",
};

export default function DownloadReceiptButton({
  transaction = placeholderOrder,
}: {
  transaction?: ReceiptTransaction;
}) {
  const [downloading, setDownloading] = useState(false);

  async function download() {
    if (downloading) return;
    setDownloading(true);
    try {
      const { exportReceipt } = await import("@/lib/helpers/receipt");
      await exportReceipt(transaction, "download");
    } catch (error) {
      console.error("Receipt download failed:", error);
      toast.add({
        title: "Receipt unavailable",
        description: "We couldn't generate your receipt. Please try again.",
        type: "error",
      });
    } finally {
      setDownloading(false);
    }
  }

  return (
    <Button
      variant={"ghost"}
      className={"flex items-center justify-center w-full"}
      onClick={download}
      disabled={downloading}
      aria-busy={downloading}
    >
      <Download size={16} />
      <span>Download Receipt</span>
    </Button>
  );
}
