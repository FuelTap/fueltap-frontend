"use client";

import React, { createContext, useContext, useState } from "react";
import { logoutAction } from "@/lib/server/auth";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";

type Profile = {
  fullName: string;
  email: string;
  phoneNumber: string;
};
type Account = {
  role: string[];
};

type Documents = {
  bvn: string | null;
  nin: string | null;
};

type Status = "pending" | "approved" | "rejected";

type KYC = {
  overallKycStatus: "not submitted" | "unverified" | "in-progress" | "verified";
  verification: {
    idverification: Status;
    addressVerification: Status;
    livenessVerisfication: Status;
  };
};

type Wallet = {
  walletExists: boolean;
};
type Bank = {
  bankExists: boolean;
};
export type User = {
  id: string;
  profile: Profile;
  account: Account;
  documents: Documents;
  kyc: KYC;
  wallet: Wallet;
  bank: Bank;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);

  const { replace } = useRouter();
  const handleLogout = async () => {
    if (user?.id) {
      const runLogout = async () => {
        const res = await logoutAction(
          user.id,
          window.location.pathname +
            window.location.search +
            window.location.hash,
        );

        if (!res || !res.success) {
          throw new Error("Could not log out.");
        }

        setUser(null);
        replace("/login");
      };
      toast.promise(runLogout(), {
        loading: "Logging out…",
        success: `logged out successfully.`,
        error: () => {
          return "Could not log out.";
        },
      });
    } else {
      toast.add({
        description: "You are not logged in",
      });
      replace("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
