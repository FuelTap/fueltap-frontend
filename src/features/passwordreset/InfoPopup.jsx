import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useScreenSize } from '@/hooks/useScreenSize';
import { useEffect, useState } from 'react';
import { FaRegEnvelope } from 'react-icons/fa6';

function Reusable({ email, countDown, handleResend, onClose }) {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-secondary-400 mb-5 flex h-20 w-20 items-center justify-center rounded-full text-white">
        <FaRegEnvelope size={30} />
      </span>

      <h4 className="mb-2 text-xl">Check your email</h4>

      <p className="mb-6 px-4 text-center">
        We sent an email to <strong>{email}</strong>. Follow the instructions to
        reset your password.
      </p>

      <div className="mb-4 flex items-center gap-2">
        <small className="underline">Didn’t get an email?</small>

        {countDown > 0 ? (
          <small>Resend in 00:{countDown.toString().padStart(2, '0')}</small>
        ) : (
          <button onClick={handleResend} className="text-primary underline">
            Resend email
          </button>
        )}
      </div>

      <Button className="h-11 w-full" onClick={onClose}>
        Done
      </Button>
    </div>
  );
}

const InfoPopup = ({ onClose, email, resend }) => {
  const { isSmallScreen } = useScreenSize(500);
  const [open, setOpen] = useState(true);

  const [countDown, setCountDown] = useState(30);

  useEffect(() => {
    if (countDown === 0) return;

    const timer = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countDown]);

  useEffect(() => {
    if (!open) onClose();
  }, [open, onClose]);

  const handleResend = () => {
    resend();
    setCountDown(30);
  };

  // ---------------- MOBILE ----------------
  if (isSmallScreen) {
    return (
      <div
        className={`fixed inset-0 bg-black/25 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed bottom-0 left-0 min-h-[370px] w-screen rounded-t-4xl bg-white p-4 transition-all ${
            open ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <Reusable
            email={email}
            countDown={countDown}
            handleResend={handleResend}
            onClose={onClose}
          />
        </div>
      </div>
    );
  }

  // ---------------- DESKTOP ----------------
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[480px] text-center md:rounded-xl">
        <Reusable
          email={email}
          countDown={countDown}
          handleResend={handleResend}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default InfoPopup;
