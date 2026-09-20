"use client";
import Image from "next/image";
import { useState } from "react";
import SuccessModal from "../SuccessModal";
import SetPinForm from "./SetPinForm";

const SetPinClient = () => {
  const [isActionComplete, setIsActionComplete] = useState(false);
  return (
    <>
      {!isActionComplete ? (
        <section className="mx-auto p-8 rounded-2xl max-w-142 bg-neutral-400 border border-gray-100">
          <div className="flex flex-col items-center ">
            <Image
              src={"/assets/user/kyc-image.png"}
              height={115}
              width={184}
              className=""
              alt="kyc image"
            />
            <div className="mb-5">
              <h2 className="text-black text-base font-semibold mt-5 mb-2 lg:text-xl">
                Set your transaction PIN
              </h2>
              <p className="text-sm lg:text-base font-normal text-grey-800 leading-6">
                Create a 4-digit PIN to secure your transactions
              </p>
            </div>
          </div>
          <SetPinForm onComplete={setIsActionComplete} />
        </section>
      ) : (
        <SuccessModal
          text={"Your transaction PIN was created successfully."}
          title={"Setup complete"}
        />
      )}
    </>
  );
};

export default SetPinClient;
