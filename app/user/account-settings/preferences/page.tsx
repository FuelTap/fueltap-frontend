import { Switch } from "@/components/ui/switch";
import { Wallpaper } from "lucide-react";

const PreferencePage = () => {
  return (
    <div className="basis-full p-3  md:p-8 rounded-2xl border border-grey-200 bg-[#FDFDFE] ">
      <div className="mb-6 space-y-0.5">
        <h4 className="text-sm md:text-lg font-semibold">Preferences</h4>
        <p className="text-sm md:text-lg text-grey-800">
          Customize your app experience and notifications
        </p>

        <div className="mt-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-1.5 md:gap-3">
            <span
              className={
                "rounded-full bg-green-50 shrink-0 size-8 md:size-10 items-center justify-center text-green-400 flex"
              }
            >
              <Wallpaper size={20} />
            </span>
            <div className="space-y-1">
              <h5 className="font-medium! text-sm md:text-base lg:text-xl">
                Push Notifications
              </h5>
              <p className="text-xs font-medium md:text-base text-grey-800">
                Receive notifications about orders
              </p>
            </div>
          </div>

          <Switch className={"cursor-pointer "} />
          {/* <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label> */}
        </div>
      </div>
    </div>
  );
};

export default PreferencePage;
