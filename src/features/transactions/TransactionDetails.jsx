import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useScreenSize } from '@/hooks/useScreenSize';
import { formatCurrency } from '@/utils/helpers';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { useEffect, useRef, useState } from 'react';
import { FaArrowsRotate } from 'react-icons/fa6';
import { FiShare2 } from 'react-icons/fi';
import { LiaTimesSolid } from 'react-icons/lia';
import { LuFuel, LuPlus } from 'react-icons/lu';
import { toast } from 'sonner';

const TransactionDetails = ({ transaction, onClose }) => {
  const { isSmallScreen } = useScreenSize(768);
  const [open, setOpen] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const printRef = useRef();

  useEffect(() => {
    if (!open) onClose();
  }, [open, onClose]);

  const handleSharePDF = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      setIsSharing(true);

      // 1️⃣ Convert hidden receipt to PNG
      const dataUrl = await toPng(element, { quality: 1, pixelRatio: 2 });

      // 2️⃣ Create PDF from image
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(dataUrl);

      // 🧭 Keep 40px margin around
      const margin = 40;
      const availableWidth = pageWidth - margin * 2;
      const scaledHeight = (imgProps.height * availableWidth) / imgProps.width;

      // 🧩 Center vertically on the page
      const yOffset = (pageHeight - scaledHeight) / 2;

      // ✅ Add the image with proper padding
      pdf.addImage(
        dataUrl,
        'PNG',
        margin,
        Math.max(margin, yOffset),
        availableWidth,
        scaledHeight
      );

      // 3️⃣ Export or share
      const pdfBlob = pdf.output('blob');
      const file = new File([pdfBlob], 'transaction_receipt.pdf', {
        type: 'application/pdf',
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Transaction Receipt',
          text: 'Here’s your receipt 📄',
          files: [file],
        });
      } else {
        pdf.save('transaction_receipt.pdf');
        toast.info('Sharing not supported — file downloaded instead.');
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      toast.error('Something went wrong while sharing.');
    } finally {
      setIsSharing(false);
    }
  };

  // 🧾 Hidden printable receipt layout (A4 size)
  const PrintableReceipt = () => (
    <div
      ref={printRef}
      style={{
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
        width: '595px', // A4 width
        backgroundColor: 'white',
        color: 'black',
        padding: '40px', // ✅ add padding here
        borderRadius: '8px',
        boxSizing: 'border-box',
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <Logo className="h-auto w-28" />
        <h3 className="text-lg font-semibold text-gray-700">
          Transaction Receipt
        </h3>
      </div>

      <div className="mb-6 flex flex-col items-center justify-center gap-2">
        {transaction.tnxType === 'Account Top-up' ? (
          <span className="rounded-full bg-green-50 p-2">
            <LuPlus className="text-green-400 md:text-xl" />
          </span>
        ) : (
          <span className="rounded-full bg-red-50 p-2">
            <LuFuel className="text-error md:text-xl" />
          </span>
        )}
        <h2 className="text-3xl font-bold tracking-tighter text-black">
          {formatCurrency(transaction.amt)}
        </h2>
        <h6 className="text-gray-700">{transaction.date || 'date'}</h6>
      </div>

      {/* Details */}
      <div className="overflow-hidden rounded-lg border">
        <div className="flex items-center justify-between border-b p-3">
          <p className="text-sm text-black">Payment method</p>
          <p className="text-sm font-medium">Bank Transfer</p>
        </div>
        <div className="flex items-center justify-between border-b p-3">
          <p className="text-sm text-black">Description</p>
          <p className="text-sm font-medium">Credit</p>
        </div>
        <div className="flex items-center justify-between border-b p-3">
          <p className="text-sm text-black">Reference</p>
          <p className="text-sm font-medium">Fhdle839hd9289</p>
        </div>
        <div className="flex items-center justify-between p-3">
          <p className="text-sm text-black">Status</p>
          <p className="text-sm font-medium text-green-400">Successful</p>
        </div>
      </div>

      {/* Footer */}

      <p className="mt-10 text-xs text-gray-500">
        Thank you for choosing FuelTap — Your trusted refueling partner.
      </p>
    </div>
  );

  // 🧩 --- Main JSX ---

  if (isSmallScreen) {
    return (
      <>
        {/* Hidden printable layout */}
        <PrintableReceipt />

        <div
          className={`fixed inset-0 bg-black/25 backdrop-blur-xs transition-opacity duration-500 ease-in-out ${
            open ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`fixed bottom-0 left-0 flex min-h-[512px] w-screen transform flex-col justify-between space-y-6 rounded-t-4xl bg-white p-4 text-center shadow-lg transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="flex items-center justify-between">
              <h5 className="text-primary">Transaction Details</h5>
              <div className="flex items-center gap-2">
                {!isSharing ? (
                  <FiShare2
                    className="cursor-pointer text-[18px]"
                    onClick={handleSharePDF}
                  />
                ) : (
                  <FaArrowsRotate className="animate-spin text-xl text-gray-500" />
                )}
              </div>
            </div>

            <div className="pb-8">
              <div className="mb-6 flex flex-col items-center justify-center gap-2">
                {transaction.tnxType === 'Account Top-up' ? (
                  <span className="rounded-full bg-green-50 p-2">
                    <LuPlus className="text-green-400 md:text-xl" />
                  </span>
                ) : (
                  <span className="rounded-full bg-red-50 p-2">
                    <LuFuel className="text-error md:text-xl" />
                  </span>
                )}

                <h2 className="text-3xl font-bold tracking-tighter text-black">
                  {formatCurrency(transaction.amt)}
                </h2>
                <h6 className="text-gray-700">{transaction.date || 'date'}</h6>
              </div>

              <div className="border py-2">
                <div className="flex items-center justify-between border-b p-3">
                  <p className="text-xl-regular text-black">Payment method</p>
                  <p className="text-xl-regular font-medium">Bank Transfer</p>
                </div>
                <div className="flex items-center justify-between border-b p-3">
                  <p className="text-xl-regular text-black">Description</p>
                  <p className="text-xl-regular font-medium">Credit</p>
                </div>
                <div className="flex items-center justify-between border-b p-3">
                  <p className="text-xl-regular text-black">Reference</p>
                  <p className="text-xl-regular font-medium">Fhdle839hd9289</p>
                </div>
                <div className="flex items-center justify-between p-3">
                  <p className="text-xl-regular text-black">Status</p>
                  <p className="text-xl-regular font-medium text-green-400">
                    Successful
                  </p>
                </div>
              </div>
            </div>

            <Button size={'full'} onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PrintableReceipt />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-[560px] text-center md:rounded-xl"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <h5 className="text-primary">Transaction Details</h5>
              <div className="flex items-center gap-2">
                {!isSharing ? (
                  <FiShare2
                    className="cursor-pointer text-[18px]"
                    onClick={handleSharePDF}
                  />
                ) : (
                  <FaArrowsRotate className="animate-spin text-xl text-gray-500" />
                )}
                <LiaTimesSolid
                  onClick={onClose}
                  className="cursor-pointer text-sm"
                />
              </div>
            </DialogTitle>

            <DialogDescription className="mt-8 space-y-12">
              <div>
                <div className="mb-8 flex flex-col items-center justify-center gap-1">
                  {transaction.tnxType === 'Account Top-up' ? (
                    <span className="rounded-full bg-green-50 p-2">
                      <LuPlus className="text-xl text-green-400" />
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-50 p-2">
                      <LuFuel className="text-error text-xl" />
                    </span>
                  )}

                  <h2 className="text-3xl font-bold tracking-tighter text-black">
                    {formatCurrency(transaction.amt)}
                  </h2>
                  <h6 className="text-gray-700">
                    {transaction.date || 'date'}
                  </h6>
                </div>
                <div className="border px-2 py-3">
                  <div className="flex items-center justify-between border-b px-3 py-4">
                    <span className="text-xl-regular text-black">
                      Payment method
                    </span>
                    <span className="text-xl-regular font-medium">
                      Bank Transfer
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b px-3 py-4">
                    <span className="text-xl-regular text-black">
                      Description{' '}
                    </span>
                    <span className="text-xl-regular font-medium">Credit</span>
                  </div>
                  <div className="flex items-center justify-between border-b px-3 py-4">
                    <span className="text-xl-regular text-black">
                      Reference{' '}
                    </span>
                    <span className="text-xl-regular font-medium">
                      Fhdle839hd9289
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-4">
                    <span className="text-xl-regular text-black">Status</span>
                    <span className="text-xl-regular font-medium text-green-400">
                      Successful
                    </span>
                  </div>
                </div>
              </div>

              <Button size={'full'} onClick={onClose}>
                Close
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransactionDetails;
