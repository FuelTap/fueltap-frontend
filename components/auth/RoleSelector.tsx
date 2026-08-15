"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
function RoleSelector() {
  const [registerAs, setRegisterAs] = useState("customer");

  const router = useRouter();
  function selectRole(e: React.MouseEvent, role: string) {
    e.preventDefault();
    setRegisterAs(role);
  }

  function handleSubmit() {
    router.push(`/register?role=${encodeURIComponent(registerAs)}`);
  }
  return (
    <div className="mt-10 flex my-auto h-[65dvh] flex-col space-y-2 md:h-[50vh]">
      <Button
        type="button"
        onClick={(e) => selectRole(e, "customer")}
        size="full"
        variant="secondary"
        className={`text-md-medium text-white transition-colors ${
          registerAs !== "customer"
            ? "bg-green-50 text-[#0D9467] hover:text-white"
            : ""
        }`}
      >
        Customer
      </Button>

      <Button
        type="button"
        onClick={(e) => selectRole(e, "supplier")}
        size="full"
        variant="secondary"
        className={`text-md-medium text-white transition-colors ${
          registerAs === "supplier"
            ? ""
            : "bg-green-50 text-[#0D9467] hover:text-white"
        }`}
      >
        Supplier
      </Button>

      <div className="mb-4 bg-white max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:p-4 md:mt-10">
        <Button
          type="button"
          size={"full"}
          className={"text-md-medium text-white"}
          onClick={handleSubmit}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default RoleSelector;
