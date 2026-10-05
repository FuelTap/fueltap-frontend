import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
} from "@/components/animate-ui/components/base/alert-dialog";
import ripple from "@/public/assets/animations/ripple.json";
import Lottie from "lottie-react";
const Searching = ({
  text = "Finding nearby suppliers",
  searching,
  onSearchingChange,
}: {
  text?: string;
  searching: boolean;
  onSearchingChange?: (open: boolean) => void;
}) => {
  return (
    <>
      <AlertDialog open={searching} onOpenChange={onSearchingChange}>
        <AlertDialogPopup className="sm:max-w-106.25 bg-linear-to-r from-primary-900 to-[#1E3A8A] border-0  rounded-4xl ">
          <Lottie
            animationData={ripple}
            // speed={1.5}
            loop
            autoplay
            className="mx-auto md:w-[70%]"
          />

          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-white">
              {text}
            </AlertDialogTitle>
          </AlertDialogHeader>
        </AlertDialogPopup>
      </AlertDialog>
    </>
  );
};

export default Searching;
