"use client";

import { buttonVariants } from "@/components/ui/button";
import successAnim from "@/public/assets/animations/success2.json";
import Lottie from "lottie-react";
import Link from "next/link";

// same as SuccessModal but uses functions to close the modal instead of navigating

const SuccessModal = ({
  title,
  text,
  onClick,
}: {
  title: string;
  text: string;
  onClick: any;
}) => {
  return (
    <main className="w-screen h-screen fixed top-0 left-0 z-100 flex items-center justify-center">
      <article className="bg-white w-82.5 p-4 md:w-100 flex flex-col items-center justify-center text-center space-y-5 rounded-2xl shadow">
        <Lottie animationData={successAnim} loop={true} className="h-40 w-40" />

        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
          <p className="text-sm md:text-base text-grey-800">{text}</p>
        </div>

        <button
          className={`${buttonVariants({ size: "full" })} rounded-[999px]!`}
          onClick={() => onClick()}
        >
          Okay
        </button>
      </article>
    </main>
  );
};

export default SuccessModal;
