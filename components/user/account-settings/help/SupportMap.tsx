"use client";

import { buttonVariants } from "@/components/ui/button";
import { Clock2 } from "lucide-react";
import Image from "next/image";

interface IProps {
  title: string;
  description: string;
  image: string;
}

const SupportMap = ({ title, description, image }: IProps) => {
  return (
    <div className="border-[0.5px] border-[#DCDDDD] bg-white max-h-82.75 rounded-2xl p-4 md:p-6">
      <div className="space-y-5 md:space-y-7">
        <Image src={image} height={60} width={60} alt={title} />
        <div>
          <h5 className="text-base md:text-lg lg:text-xl font-semibold">
            {title}
          </h5>
          <p className="text-grey-800 text-sm">{description}</p>
        </div>

        <div className="flex gap-1 text-grey-800 items-center">
          <Clock2 size={14} strokeWidth={1} />
          <small className="text-sm">Available 24/7</small>
        </div>

        <div className="mt-auto">
          {title === "WhatsApp" && (
            <a
              href="https://wa.me/2349022517371"
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonVariants({ size: "full" })} w-full! rounded-[24px]! bg-green-500! py-3! px-4!`}
            >
              Start Chat
            </a>
          )}

          {title === "Phone Support" && (
            <a
              href="tel:+2348086953112"
              className={`${buttonVariants({ size: "full" })} w-full! rounded-[24px]! py-3! px-4!`}
            >
              Call Now
            </a>
          )}

          {title === "Email Support" && (
            <a
              href="mailto:support@mails.fueltap.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonVariants({ size: "full" })} w-full! rounded-[24px]! bg-black! py-3! px-4!`}
            >
              Start Chat
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportMap;
