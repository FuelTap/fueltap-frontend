import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import successAnim from '@/components/assets/success.json';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useScreenSize } from '@/hooks/useScreenSize';

function RegistrationSuccess({ time = 3000, link = '/user' }) {
  const navigate = useNavigate();

  // ✅ Detect small screens (<768px)
  const { isSmallScreen } = useScreenSize(768);

  const [open, setOpen] = useState(false);

  // ✅ Open modal automatically for medium & large screens
  useEffect(() => {
    if (!isSmallScreen) {
      setOpen(true);
    }
  }, [isSmallScreen]);

  // ✅ Auto-redirect logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(link);
    }, time);
    return () => clearTimeout(timeout);
  }, [navigate, link, time]);

  // ✅ Small screens → inline display
  if (isSmallScreen) {
    return (
      <div className="bg-primary-900 fixed bottom-0 left-0 flex h-[87%] w-screen flex-col items-center justify-center rounded-t-2xl text-center md:static md:h-[349px] md:w-[327px] md:rounded-b-2xl">
        <Lottie
          animationData={successAnim}
          loop={false}
          className="h-40 w-40"
        />
        <h2 className="mt-4 text-lg font-semibold text-green-700">
          Registration successful!
        </h2>
        <p className="text-gray-500">Redirecting shortly...</p>
      </div>
    );
  }

  // ✅ Medium & large screens → dialog modal
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-primary-900 border-0! text-center text-white md:rounded-2xl"
      >
        <DialogHeader>
          {/* <DialogTitle>Registration Complete 🎉</DialogTitle> */}
          <DialogDescription>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <Lottie
                animationData={successAnim}
                loop={false}
                className="h-40 w-40"
              />
              <h2 className="mt-4 text-lg font-semibold text-green-700">
                Registration successful!
              </h2>
              <p className="text-gray-500">Redirecting shortly...</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default RegistrationSuccess;
