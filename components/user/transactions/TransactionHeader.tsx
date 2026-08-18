"use client";
import { ChevronLeft, Filter, ListFilterPlus } from "lucide-react";
import { useRouter } from "next/navigation";

const TransactionHeader = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <ChevronLeft
        size={32}
        className={"cursor-pointer bg-gray-100"}
        onClick={() => router.back()}
      />
      <h2 className="font-semibold text-black md:text-3xl">
        Transaction History
      </h2>

      <ListFilterPlus className="text-neutra-600 cursor-pointer" size={30} />
    </div>
  );
};

export default TransactionHeader;
