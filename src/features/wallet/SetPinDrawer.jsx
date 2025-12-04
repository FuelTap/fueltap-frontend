import { useState, useRef } from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { toast } from 'sonner';

const SetPinDrawer = () => {
  const [pin, setPin] = useState(['', '', '', '']);

  const inputRefs = Array.from({ length: 4 }, () => useRef(null));

  const handleChange = (value, index) => {
    if (isNaN(value)) return; // only numbers

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // move to next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  async function onSubmit() {
    const newPin = pin.join('');
    console.log(newPin.length);
    try {
      setIsSubmitting(true);
      const response = await axiosPrivate.post(
        'v1/wallet/set-transaction-pin',
        {
          pin: newPin,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-transparent text-black hover:text-white">
          Set PIN
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-6">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">
            Set Transaction PIN
          </DrawerTitle>
          <p className="text-gray-600">Enter a secure 4-digit PIN</p>
        </DrawerHeader>

        {/* PIN INPUTS */}
        <div className="flex justify-center gap-4 py-6">
          {pin.map((digit, index) => (
            <Input
              key={index}
              ref={inputRefs[index]}
              type="password"
              maxLength={1}
              value={digit}
              className="h-12 w-12 text-center text-2xl"
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </div>

        <DrawerFooter>
          <Button
            disabled={isSubmitting}
            className="h-14 w-full text-2xl"
            onClick={() => onSubmit()}
          >
            Submit PIN
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SetPinDrawer;
