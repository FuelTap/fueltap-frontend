import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image src={"/logo.png"} height={48} width={119} alt="FuelTap's logo" />
    </Link>
  );
};

export default Logo;
