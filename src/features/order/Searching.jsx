import ripple from '@/components/assets/Ripple.json';
import Lottie from 'lottie-react';
const Searching = ({ text = 'Finding nearby suppliers' }) => {
  return (
    <div className="h-[80dvh] w-screen max-w-[560px] rounded-t-2xl bg-black md:h-[437px] md:rounded-2xl">
      <Lottie
        animationData={ripple}
        loop
        autoplay
        className="mx-auto md:w-[70%]"
        speed={1.5}
      />
      <p className="text-center text-white">{text}</p>
    </div>
  );
};

export default Searching;
