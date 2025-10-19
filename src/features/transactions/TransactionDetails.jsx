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
import html2canvas from 'html2canvas';
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

  useEffect(() => {
    if (!open) onClose(); // close modal when Dialog closes
  }, [open, onClose]);

  const printRef = useRef();
  const [isSharing, setIsSharing] = useState(false);

  const handleSharePDF = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      setIsSharing(true);
      // Step 1️⃣: Take a snapshot of the receipt
      const dataUrl = await toPng(element, { quality: 1, pixelRatio: 2 });

      // Step 2️⃣: Create a PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Step 3️⃣: Turn the PDF into a Blob
      const pdfBlob = pdf.output('blob');

      // Step 4️⃣: Turn that Blob into a File
      const file = new File([pdfBlob], 'transaction_receipt.pdf', {
        type: 'application/pdf',
      });

      // Step 5️⃣: Share it
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

  if (isSmallScreen) {
    return (
      <div
        className={`fixed inset-0 bg-black/25 backdrop-blur-xs transition-opacity duration-500 ease-out ${
          transaction ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed bottom-0 left-0 flex h-[67dvh] w-screen flex-col justify-between space-y-6 rounded-t-4xl bg-white p-4 text-center shadow-lg transition-transform duration-500 ease-out ${transaction ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className="flex items-center justify-between">
            <h5 className="text-primary">Transaction Details</h5>
            <div className="flex items-center gap-2">
              <FiShare2
                className="cursor-pointer text-[18px]"
                onClick={() => handleSharePDF()}
              />
            </div>
          </div>

          <div ref={printRef}>
            <div className="mb-6 flex flex-col items-center justify-center gap-1">
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
              <h6 className="text-gray-700">{transaction.date || 'date'}</h6>
            </div>

            <div className="border py-2">
              <div className="flex items-center justify-between border-b px-2 py-1">
                <p className="text-xl-regular text-black">Payment method</p>
                <p className="text-xl-regular font-medium">Bank Transfer</p>
              </div>
              <div className="flex items-center justify-between border-b px-2 py-1">
                <p className="text-xl-regular text-black">Description</p>
                <p className="text-xl-regular font-medium">Credit</p>
              </div>
              <div className="flex items-center justify-between border-b px-2 py-1">
                <p className="text-xl-regular text-black">Reference</p>
                <p className="text-xl-regular font-medium">Fhdle839hd9289</p>
              </div>
              <div className="flex items-center justify-between px-2 py-1">
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
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="w-[560px] text-center md:rounded-xl"
      >
        <DialogHeader>
          <DialogTitle className={'flex items-center justify-between'}>
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
          <DialogDescription className={'mt-8 space-y-12'}>
            <div ref={printRef}>
              <div className="mb-18 flex flex-col items-center justify-center gap-1">
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
                <h6 className="text-gray-700">{transaction.date || 'date'}</h6>
              </div>
              <div className="border py-2">
                <div className="flex items-center justify-between border-b px-2 py-1">
                  <p className="text-xl-regular text-black">Payment method</p>
                  <p className="text-xl-regular font-medium">Bank Transfer</p>
                </div>
                <div className="flex items-center justify-between border-b px-2 py-1">
                  <p className="text-xl-regular text-black">Description </p>
                  <p className="text-xl-regular font-medium">Credit</p>
                </div>
                <div className="flex items-center justify-between border-b px-2 py-1">
                  <p className="text-xl-regular text-black">Reference </p>
                  <p className="text-xl-regular font-medium">Fhdle839hd9289</p>
                </div>
                <div className="flex items-center justify-between px-2 py-1">
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetails;
