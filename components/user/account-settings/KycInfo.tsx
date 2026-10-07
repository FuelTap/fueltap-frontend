import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCheck, IdCard, Plus } from "lucide-react";

const KycInfo = () => {
  return (
    <div className="border border-gray-100 bg-[#FDFDFE] p-5 md:p-8 mb-4">
      <h2 className="text-base md:text-lg font-semibold mb-8">
        KYC Information
      </h2>

      {/* bvn */}
      <div className="py-5 px-3 md:px-3.5 flex border-b border-grey-200 md:items-center justify-between flex-col md:flex-row">
        <div className="flex gap-2">
          <span className="size-10 bg-green-50 rounded-full flex items-center justify-center cursor-pointer">
            <IdCard className="text-green-400" size={18} />
          </span>
          <div className="space-y-1">
            <h3 className="text-sm md:text-base font-medium">
              Bank Verification Number
            </h3>
            <p className="text-sm text-grey-800 md:text-base">100***116</p>
          </div>
        </div>

        <Badge className="max-sm:self-end bg-green-50 text-green-400 text-sm md:text-base font-semibold py-3! flex items-center gap-2.5 px-5">
          {" "}
          <span>Verified</span> <CheckCheck size={24} />
        </Badge>
      </div>

      {/* NiN */}
      <div className="py-5 px-3 md:px-3.5 flex border-b border-grey-200 flex-col md:flex-row md:items-center justify-between">
        <div className="flex gap-2">
          <span className="size-10 bg-green-50 rounded-full flex items-center justify-center cursor-pointer">
            <IdCard className="text-green-400" size={18} />
          </span>
          <div className="space-y-1">
            <h3 className="text-sm md:text-base font-medium">
              National Identification Number
            </h3>
            <p className="text-sm text-grey-800 md:text-base">---</p>
          </div>
        </div>

        <Button className="max-sm:self-end bg-green-50 rounded-[999px] text-green-300 text-sm md:text-base font-semibold hover:text-white flex items-center gap-0.5 ">
          {" "}
          <Plus size={24} /> <span>Add</span>
        </Button>
      </div>

      {/* valid id */}
      <div className="py-5 px-3 md:px-3.5 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex gap-2">
          <span className="size-10 bg-green-50 rounded-full flex items-center justify-center cursor-pointer">
            <IdCard className="text-green-400" size={18} />
          </span>
          <div className="space-y-1">
            <h3 className="text-sm md:text-base font-medium">Valid Id</h3>
            <p className="text-sm text-grey-800 md:text-base">
              Add an extra layer of security to your account
            </p>
          </div>
        </div>

        <Badge className="max-sm:self-end bg-yellow-50 text-yellow-400 text-sm md:text-base font-semibold py-3! flex items-center gap-2.5 px-5">
          {" "}
          <span>Pending</span>
        </Badge>
      </div>
    </div>
  );
};

export default KycInfo;
