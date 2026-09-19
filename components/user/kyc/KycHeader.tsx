import Image from "next/image";

const KycHeader = () => {
  return (
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
          Verify Your Identity
        </h2>
        <p className="text-sm lg:text-base font-normal text-grey-800 leading-6">
          To keep your account secure and meet regulatory requirements, we need
          to verify your identity. It only takes about 5 minutes.
        </p>
      </div>
    </div>
  );
};

export default KycHeader;
