import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BiTargetLock } from 'react-icons/bi';
import { LuFuel } from 'react-icons/lu';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import WalletPopup from './WalletPopup';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Success2 from '@/components/Success2';

const OrderSummary = () => {
  const navigate = useNavigate();
  // static values (replace with real data when available)
  const petrolPrice = 980; // per liter
  const deliveryFee = 2500;
  const otherCharges = 50;
  const amountLiters = 10; // 10L

  const petrolTotal = petrolPrice * amountLiters;
  const grandTotal = petrolTotal + deliveryFee + otherCharges;

  const fmt = (n) => '₦' + n.toLocaleString();

  const [isSuccessful, setIsSuccessful] = useState(false);

  if (isSuccessful) {
    return (
      <Success2 link={'/user'}>
        <div className="flex flex-col items-center justify-center gap-4 text-white">
          <h3 className="text-3xl">Payment Successful</h3>
          <p>Your order is on its way</p>
        </div>
      </Success2>
    );
  }
  return (
    <>
      <div className="relative h-[80dvh] max-h-[755px] w-screen overflow-hidden px-3 py-6 hover:overflow-y-scroll md:w-[400px] md:p-6 lg:w-[616px] lg:px-8 lg:py-12">
        {/* header */}
        <div className="mb-3 flex items-center gap-4 py-3">
          <MdKeyboardArrowLeft
            className="cursor-pointer text-2xl"
            onClick={() => navigate(-1)}
          />
          <h4 className="text-2xl font-semibold md:text-[28px] lg:text-4xl">
            Order Summary
          </h4>
        </div>
        {/* badges */}
        <div className="text mb-4 space-x-2.5">
          <Badge className={'text-white'} variant={'accent'}>
            One-Time
          </Badge>
          <Badge className={'text-white'} variant={'accent'}>
            Petrol
          </Badge>
          <Badge className={'text-white'} variant={'accent'}>
            10L
          </Badge>
        </div>
        <div className="mb-6 flex items-center justify-between py-3">
          <h4 className="title font-medium!">5b ikoyi street</h4>
          <BiTargetLock className="text-2xl text-yellow-700" />
        </div>
        <div className="mb-6 flex items-center justify-between py-3">
          <h4 className="title font-medium!">Total Energies</h4>
          <LuFuel className="text-2xl text-yellow-700" />
        </div>

        {/* summary */}
        <div className="mt-4 overflow-auto">
          <table className="w-full table-fixed text-sm">
            <thead>
              <tr className="text-primary text-left">
                <th className="py-2">Item</th>
                <th className="py-2">Price</th>
                <th className="py-2">Amount</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="text-neutra-1000">
              <tr className="border-t">
                <td className="py-3">Petrol</td>
                <td className="py-3">{`₦${petrolPrice.toLocaleString()}/ltr`}</td>
                <td className="py-3">{amountLiters}L</td>
                <td className="py-3 text-right font-medium">
                  {fmt(petrolTotal)}
                </td>
              </tr>
              <tr className="border-t">
                <td className="py-3">Delivery</td>
                <td className="py-3">{fmt(deliveryFee)}</td>
                <td className="py-3">-</td>
                <td className="py-3 text-right">{fmt(deliveryFee)}</td>
              </tr>
              <tr className="border-t">
                <td className="py-3">Charges</td>
                <td className="py-3">{fmt(otherCharges)}</td>
                <td className="py-3">-</td>
                <td className="py-3 text-right">{fmt(otherCharges)}</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 mb-2 flex items-center justify-between rounded-[8px] border-[0.5px] p-2 shadow-lg">
            <span className="text-lg font-medium">Sum Total</span>
            <span className="text-lg font-semibold text-green-500">
              {fmt(grandTotal)}
            </span>
          </div>
        </div>

        <WalletPopup OnPay={() => setIsSuccessful(true)} />
      </div>
    </>
  );
};

export default OrderSummary;
