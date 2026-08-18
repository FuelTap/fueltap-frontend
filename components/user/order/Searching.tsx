import ripple from "@/public/assets/animations/ripple.json";
import Lottie from "lottie-react";
const Searching = ({ text = "Finding nearby suppliers" }) => {
  return (
    <div className="h-[80dvh] w-screen max-w-140 rounded-t-2xl bg-black md:h-109.25 md:rounded-2xl">
      <Lottie
        animationData={ripple}
        // speed={1.5}
        loop
        autoplay
        className="mx-auto md:w-[70%]"
      />
      <p className="text-center text-white">{text}</p>
    </div>
  );
};

export default Searching;
