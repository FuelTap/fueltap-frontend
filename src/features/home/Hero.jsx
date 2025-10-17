import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const Hero = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 py-6 md:flex-row md:items-center md:py-10">
      <div className="flex flex-col gap-2 md:gap-1">
        <h1 className="text-[40px] leading-[110%] md:text-6xl md:leading-[120%]">
          Tired of fuel
          <br />
          <span className="text-secondary-500 font-bold">wahala?</span>
        </h1>
        <p className="text-grey-800 text-xl-regular">
          Let’s get you refilled in seconds.
        </p>
        <Button size={'pill'} className={'self-start'}>
          Order Now
        </Button>
      </div>

      <Skeleton className="bg-neutra-600 h-[248px] w-full md:h-[40vh] md:basis-1/2" />
    </div>
  );
};

export default Hero;
