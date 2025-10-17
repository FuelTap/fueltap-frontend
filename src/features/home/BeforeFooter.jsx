import { Button } from '@/components/ui/button';
import Faq from './Faq';

const BeforeFooter = () => {
  return (
    <section className="mt-6 flex flex-col justify-between gap-4 md:mt-10 md:flex-row">
      <div className="md-basis-[23%] flex basis-full flex-col gap-2 md:gap-6 lg:basis-[35%]">
        <h2 className="text-4xl font-bold md:text-[40px] lg:text-5xl">
          A world of convenience awaits
        </h2>
        <p className="text-xl-regular text-neutra-1000">
          Get started today. Try it now.
        </p>
        <div>
          <Button className={'h-[47px] w-[127px] rounded-3xl px-4 py-3'}>
            Order Now
          </Button>
        </div>
      </div>

      <Faq />
    </section>
  );
};

export default BeforeFooter;
