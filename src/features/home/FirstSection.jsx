import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const section = [
  {
    title: 'Live Price Display',
    text: 'Compare fuel prices in real time. No surprises here.',
    img: '',
  },
  {
    title: 'Verified Suppliers',
    text: 'Order your desired fuel amount from verified suppliers.',
    img: '',
  },
  {
    title: 'Track Your Order',
    text: 'Track your order from placement to delivery.',
    img: '',
  },
  {
    title: 'Subscription Plan',
    text: 'Easily set up recurring orders - daily, monthly, forever.',
    img: '',
  },
];
const FirstSection = () => {
  return (
    <div className="mt-6 flex flex-col gap-2 md:mt-12 md:gap-4">
      <div className="mb-4 flex flex-col gap-2">
        <h3 className="text-2xl leading-[110%] font-semibold md:text-3xl">
          Fuel-Tap ke?
        </h3>
        <p className="text-xl-regular text-neutra-1000">
          FuelTap is an online fuel delivery and price tracking service. Order.
          Track. Pickup. We make it easy.
        </p>
      </div>
      <section className="grid w-full grid-cols-1 place-items-center items-center justify-center gap-8 rounded-sm border p-2 md:grid-cols-2">
        {section.map(({ title, text, img }, index) => (
          <div key={index} className="flex w-[95%] flex-col gap-1">
            <h6 className="text-xl-regular font-medium text-black">{title}</h6>
            <p className="text-lg-regular text-neutra-1000">{text}</p>

            <Skeleton className="bg-neutra-500 h-[120px] w-full md:h-[240px]" />
          </div>
        ))}
      </section>
      <div>
        <Button variant={'outline'}>and more...</Button>
      </div>
    </div>
  );
};

export default FirstSection;
