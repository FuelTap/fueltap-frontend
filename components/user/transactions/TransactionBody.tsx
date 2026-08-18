"use client";

import { useState } from "react";
import { Fuel, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/helpers/help";
import TransactionDetails from "./TransactionDetails";

const history = [
  {
    date: "Oct 16 2025",
    transactions: [
      { id: 1, tnxType: "Account Top-up", title: "Bank Transfer", amt: 5000 },
      { id: 2, tnxType: "Petro Purchase", title: "Total Energies", amt: 2500 },
    ],
  },
  {
    date: "Oct 15 2025",
    transactions: [
      {
        id: 3,
        tnxType: "Petro Purchase",
        title: "NNPC Mega Station",
        amt: 4500,
      },
      { id: 4, tnxType: "Account Top-up", title: "Card Payment", amt: 3000 },
    ],
  },
  {
    date: "Oct 14 2025",
    transactions: [
      { id: 5, tnxType: "Account Top-up", title: "Bank Transfer", amt: 10000 },
      {
        id: 6,
        tnxType: "Petro Purchase",
        title: "Oando Filling Station",
        amt: 2000,
      },
      { id: 7, tnxType: "Petro Purchase", title: "Enyo Retail", amt: 1500 },
    ],
  },
];

const TransactionBody = () => {
  const [selectedTxn, setSelectedTxn] = useState<{
    id: string | number;
    tnxType: string;
    title: string;
    amt: number;
  } | null>(null);
  return (
    <div className="md:p-4">
      {/* one transaction date */}
      {history.map(({ date, transactions }, index) => (
        <div className="mt-6 md:mt-4 md:p-4" key={index}>
          <h4 className="border-b pb-2 font-medium text-black md:pb-4 md:text-2xl">
            {date}
          </h4>
          <ul className="flex flex-col">
            {/* each transaction  */}
            {transactions.map(({ id, tnxType, title, amt }, idx) => (
              <li
                onClick={() => {
                  setSelectedTxn({ id, tnxType, title, amt });
                }}
                className="border-neutra-500 flex items-center justify-between border-b p-3 md:px-2 md:py-4"
                key={idx}
              >
                <div className="flex items-center gap-2">
                  {tnxType === "Account Top-up" ? (
                    <span className="rounded-full bg-green-50 p-2">
                      <Plus className="text-green-400 md:text-xl" />
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-50 p-2">
                      <Fuel className="text-error md:text-xl" />
                    </span>
                  )}

                  <div className="space-y-2">
                    <h4 className="text-lg-medium text-grey-800 max-sm:text-[16px]!">
                      {tnxType}
                    </h4>
                    <h6
                      className={`${tnxType === "Account Top-up" ? "text-green-400" : "text-error"} text-lg-regular max-sm:text-[12px]!`}
                    >
                      {title}
                    </h6>
                  </div>
                </div>

                <h5
                  className={`${tnxType === "Account Top-up" ? "text-green-500" : "text-error"} text-xl-regular font-medium max-sm:text-[16px]!`}
                >
                  {formatCurrency(amt)}
                </h5>
              </li>
            ))}
          </ul>

          {/* each transaction  */}
          {selectedTxn && (
            <TransactionDetails
              transaction={selectedTxn}
              onClose={() => setSelectedTxn(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TransactionBody;
