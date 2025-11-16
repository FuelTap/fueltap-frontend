import successAnim from '@/components/assets/success.json';
import Lottie from 'lottie-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
const Success2 = ({ time = 3000, link, children }) => {
  const navigate = useNavigate();
  // ✅ Auto-redirect logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(link);
    }, time);
    return () => clearTimeout(timeout);
  }, [navigate, link, time]);
  return (
    <div className="bg-primary-900 h-[80dvh] w-screen max-w-[560px] rounded-t-2xl md:h-[437px] md:rounded-2xl">
      <Lottie
        animationData={successAnim}
        loop
        autoplay
        className="mx-auto md:w-[50%]"
        speed={0.5}
      />
      {children}
    </div>
  );
};

export default Success2;
