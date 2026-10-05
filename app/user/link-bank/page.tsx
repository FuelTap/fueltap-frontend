import LinkBankClient from "@/components/user/link-bank/LinkBankClient";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Add your personall bank details",
};
export default function LinkBankPage() {
  return <LinkBankClient />;
}
