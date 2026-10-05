import SetPinClient from "@/components/user/set-pin/SetPinClient";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Set secure transaction Pin",
};
export default function SetPinPage() {
  return <SetPinClient />;
}
