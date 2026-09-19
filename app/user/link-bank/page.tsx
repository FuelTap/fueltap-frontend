import Image from "next/image";

export default function LinkBankPage() {
  <section className="mx-auto p-8 rounded-2xl max-w-142 bg-neutral-400 border border-gray-100">
    <div className="flex flex-col items-center ">
      <Image
        src={"/assets/user/kyc-image.png"}
        height={115}
        width={184}
        className=""
        alt="kyc image"
      />
      <div>
        <h2 className="text-black text-base font-semibold mt-5 mb-2 lg:text-xl">
          Link your bank account
        </h2>
        <p className="text-sm lg:text-base font-normal text-grey-800 leading-6">
          Please connect your bank to fund your wallet.
        </p>
      </div>
    </div>
  </section>;
}
