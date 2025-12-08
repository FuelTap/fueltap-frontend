import { useState, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { toast } from 'sonner';

export default function SetPinDialog({ open, onOpenChange }) {
  const [pin, setPin] = useState(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '']);

  const pinRefs = Array.from({ length: 4 }, () => useRef(null));
  const confirmRefs = Array.from({ length: 4 }, () => useRef(null));

  function handlePinChange(value, index) {
    if (isNaN(value)) return;

    const updated = [...pin];
    updated[index] = value;
    setPin(updated);

    if (value && index < 3) pinRefs[index + 1].current?.focus();
  }

  function handleConfirmChange(value, index) {
    if (isNaN(value)) return;

    const updated = [...confirmPin];
    updated[index] = value;
    setConfirmPin(updated);

    if (value && index < 3) confirmRefs[index + 1].current?.focus();
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  async function onSubmit() {
    const p = pin.join('');
    const c = confirmPin.join('');

    if (p.length !== 4 || c.length !== 4) {
      return toast.error('PIN must be 4 digits');
    }

    if (p !== c) {
      return toast.error('Pins do not match');
    }

    try {
      setIsSubmitting(true);
      const response = await axiosPrivate.post(
        'v1/wallet/set-transaction-pin',
        {
          pin: p,
        }
      );

      toast.success('PIN set successfully');
      onOpenChange(false); // CLOSE DIALOG
    } catch (error) {
      toast.error(error?.message || 'Failed to set PIN');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="mx-auto max-w-sm rounded-xl p-6">
        <h2 className="mb-2 text-xl font-bold">Create Transaction PIN</h2>
        <p className="mb-4 text-gray-600">Enter and confirm your 4-digit PIN</p>

        {/* CREATE PIN */}
        <label className="mb-1 block text-sm font-medium">Create PIN</label>
        <div className="flex justify-center gap-4 py-2">
          {pin.map((digit, index) => (
            <Input
              key={index}
              ref={pinRefs[index]}
              type="password"
              maxLength={1}
              value={digit}
              className="h-12 w-12 text-center text-2xl"
              onChange={(e) => handlePinChange(e.target.value, index)}
            />
          ))}
        </div>

        {/* CONFIRM PIN */}
        <label className="mt-4 mb-1 block text-sm font-medium">
          Confirm PIN
        </label>
        <div className="flex justify-center gap-4 py-2">
          {confirmPin.map((digit, index) => (
            <Input
              key={index}
              ref={confirmRefs[index]}
              type="password"
              maxLength={1}
              value={digit}
              className="h-12 w-12 text-center text-2xl"
              onChange={(e) => handleConfirmChange(e.target.value, index)}
            />
          ))}
        </div>

        <Button
          disabled={isSubmitting}
          onClick={onSubmit}
          className="mt-6 h-12 w-full text-lg"
        >
          Set PIN
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
}
