import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    title: 'How long does it take?',
    text: 'Once you submit your request, we typically connect you with verified suppliers within 24–48 hours. Timelines may vary based on your fuel type and location.',
  },
  {
    title: 'How does it work?',
    text: 'We connect buyers and suppliers through our secure platform. You post your fuel needs, receive offers from trusted suppliers, and choose the best deal for you.',
  },
  {
    title: 'Are refunds available?',
    text: 'Refunds depend on the supplier’s policy. However, our support team helps both sides resolve any issues to ensure transparency and fairness.',
  },
  {
    title: 'Who can use the platform?',
    text: 'Our platform is open to businesses, fuel distributors, and logistics providers of all sizes. Whether you need bulk fuel or want to expand your supply network, we’ve got you covered.',
  },
  {
    title: 'Is there a fee to join?',
    text: 'Creating an account is free. We only charge a small service fee per successful transaction to keep the platform secure and running smoothly.',
  },
];

const Faq = () => {
  return (
    <div className="max-sm:-order-1 lg:basis-[60%]">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold md:text-3xl lg:text-5xl">FAQSs</h2>
        <p className="text-xl-regular text-neutra-1000">
          Got questions? We’re happy to answer.
        </p>
      </div>

      <Accordion type="single" collapsible>
        {faqs.map(({ title, text }, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index + 1}>
            <AccordionTrigger className={'text-xl-regular font-medium'}>
              {title}
            </AccordionTrigger>
            <AccordionContent className={'text-md-medium text-neutra-1000'}>
              {text}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
