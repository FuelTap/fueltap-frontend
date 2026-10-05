"use client";

import { buttonVariants } from "@/components/ui/button";
import successAnim from "@/public/assets/animations/success2.json";
import Lottie from "lottie-react";
import Link from "next/link";

const SuccessModal = ({
  title,
  text,
  href = "/user/dashboard",
}: {
  title: string;
  text: string;
  href?: string;
}) => {
  return (
    <main className="w-screen h-screen fixed top-0 left-0 z-100 flex items-center justify-center">
      <article className="bg-white w-82.5 p-4 md:w-100 flex flex-col items-center justify-center text-center space-y-5 rounded-2xl shadow">
        <Lottie animationData={successAnim} loop={true} className="h-40 w-40" />

        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
          <p className="text-sm md:text-base text-grey-800">{text}</p>
        </div>

        <Link
          className={`${buttonVariants({ size: "full" })} rounded-[999px]!`}
          href={href}
        >
          Okay
        </Link>
      </article>
    </main>
  );
};

export default SuccessModal;
