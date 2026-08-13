"use client";

import Image from "next/image";
import { Clock2 } from "../animate-ui/icons/clock-2";
import { Button, buttonVariants } from "../ui/button";

interface IProps {
  title: string;
  description: string;
  image: string;
}

const SupportMap = ({ title, description, image }: IProps) => {
  return (
    <div className="border-[0.5px] border-[#DCDDDD] rounded  p-6">
      <div className="space-y-7">
        <Image src={image} height={60} width={60} alt={title} />
        <div>
          <h5 className="text-xl font-semibold">{title}</h5>
          <p className="text-gray-700 text-lg">{description}</p>
        </div>

        <div className="flex gap-1 text-grey-800 items-center">
          <Clock2 size={18} strokeWidth={1} />
          <small className="text-sm">Available 24/7</small>
        </div>

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

        {title === "Live Chat" && (
          <a
            href="https://tawk.to/chat/5b5754b4948b9212006e8572/1hrb7q7v1"
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonVariants({ size: "full" })} w-full! rounded-[24px]! bg-[#C99901]! py-3! px-4!`}
          >
            Start Chat
          </a>
        )}
      </div>
    </div>
  );
};

export default SupportMap;
