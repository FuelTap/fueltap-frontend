import AccountHeader from "@/components/user/account-settings/AccountHeader";
import SettingsNav from "@/components/user/account-settings/SettingsNav";
import { ReactNode } from "react";

const AccountSettingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <AccountHeader />

      <SettingsNav />
      <div className="mt-4">{children}</div>
    </main>
  );
};

export default AccountSettingLayout;
