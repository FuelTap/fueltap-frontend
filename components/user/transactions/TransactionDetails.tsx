import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogPopup,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/base/dialog";
import { useScreenSize } from "@/hooks/useScreenSize";
import { formatCurrency } from "@/lib/helpers/help";
import { useEffect, useState } from "react";
// import { FaArrowsRotate } from "react-icons/fa6";
// import { FiShare2 } from "react-icons/fi";
// import { LiaTimesSolid } from "react-icons/lia";
// import { LuFuel, LuPlus } from "react-icons/lu";
import { toast } from "@/components/ui/toast";
import type { ReceiptTransaction } from "@/lib/helpers/receipt";
import { Fuel, Plus, RotateCcw, Share2, X } from "lucide-react";

interface TransactionDetailsProps {
  transaction: ReceiptTransaction & { amt: number };
  onClose: () => void;
}

const TransactionDetails = ({
  transaction,
  onClose,
}: TransactionDetailsProps) => {
  const { isSmallScreen } = useScreenSize(768);
  const [open, setOpen] = useState(true);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (!open) onClose();
  }, [open, onClose]);

  const handleSharePDF = async () => {
    if (isSharing) return;
    try {
      setIsSharing(true);
      const { exportReceipt } = await import("@/lib/helpers/receipt");
      await exportReceipt(transaction, "share");
    } catch (error) {
      console.error("Receipt export failed:", error);
      toast.add({
        title: "Receipt unavailable",
        description: "We couldn't generate your receipt. Please try again.",
        type: "error",
      });
    } finally {
      setIsSharing(false);
    }
  };

  //  --- Main JSX ---

  if (isSmallScreen) {
    return (
      <>
        <div
          className={`fixed inset-0 bg-black/25 backdrop-blur-xs transition-opacity duration-500 ease-in-out ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`fixed bottom-0 left-0 flex min-h-128 w-screen transform flex-col justify-between space-y-6 rounded-t-4xl bg-white p-4 text-center shadow-lg transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="flex items-center justify-between">
              <h5 className="text-primary">Transaction Details</h5>
              <div className="flex items-center gap-2">
                {!isSharing ? (
                  <Share2
                    className="cursor-pointer text-[18px]"
                    onClick={handleSharePDF}
                  />
                ) : (
                  <RotateCcw className="animate-spin text-xl text-gray-500" />
                )}
              </div>
            </div>

            <div className="pb-8">
              <div className="mb-6 flex flex-col items-center justify-center gap-2">
                {transaction.tnxType === "Account Top-up" ? (
                  <span className="rounded-full bg-green-50 p-2">
                    <Plus className="text-green-400 md:text-xl" />
                  </span>
                ) : (
                  <span className="rounded-full bg-red-50 p-2">
                    <Fuel className="text-error md:text-xl" />
                  </span>
                )}

                <h2 className="text-3xl font-bold tracking-tighter text-black">
                  {formatCurrency(transaction.amt)}
                </h2>
                <h6 className="text-gray-700">{"date"}</h6>
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

            <Button size={"full"} onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPopup
          showCloseButton={false}
          className="w-140 text-center md:rounded-xl"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <h5 className="text-primary">Transaction Details</h5>
              <div className="flex items-center gap-2">
                {!isSharing ? (
                  <Share2
                    className="cursor-pointer text-[18px]"
                    onClick={handleSharePDF}
                  />
                ) : (
                  <RotateCcw className="animate-spin text-xl text-gray-500" />
                )}
                <X onClick={onClose} className="cursor-pointer text-sm" />
              </div>
            </DialogTitle>

            <DialogDescription className="mt-8 space-y-12">
              <div>
                <div className="mb-8 flex flex-col items-center justify-center gap-1">
                  {transaction.tnxType === "Account Top-up" ? (
                    <span className="rounded-full bg-green-50 p-2">
                      <Plus className="text-xl text-green-400" />
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-50 p-2">
                      <Fuel className="text-error text-xl" />
                    </span>
                  )}

                  <h2 className="text-3xl font-bold tracking-tighter text-black">
                    {formatCurrency(transaction.amt)}
                  </h2>
                  <h6 className="text-gray-700">{"date"}</h6>
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
                      Description{" "}
                    </span>
                    <span className="text-xl-regular font-medium">Credit</span>
                  </div>
                  <div className="flex items-center justify-between border-b px-3 py-4">
                    <span className="text-xl-regular text-black">
                      Reference{" "}
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

              <Button size={"full"} onClick={onClose}>
                Close
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogPopup>
      </Dialog>
    </>
  );
};

export default TransactionDetails;
