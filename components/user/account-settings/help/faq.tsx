"use client";
import {
  Accordion,
  AccordionPanel,
  AccordionItem,
  AccordionTrigger,
} from "@/components/animate-ui/components/base/accordion";

const faqs = [
  {
    title: "How does it work?",
    text: "Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.",
  },
  {
    title: "How long does it take?",
    text: "Once you submit your request, we typically connect you with verified suppliers within 24–48 hours. Timelines may vary based on your fuel type and location.",
  },
  {
    title: "Are refunds available?",
    text: "Refunds depend on the supplier’s policy. However, our support team helps both sides resolve any issues to ensure transparency and fairness.",
  },
];

const Faq = () => {
  return (
    <>
      <div className="flex flex-col gap-1 mb-5">
        <h2 className="text-sm md:text-lg font-semibold">FAQs</h2>
        <p className="text-sm md:text-lg text-grey-800">
          Got questions? We’re happy to answer.
        </p>
      </div>

      <Accordion>
        {faqs.map(({ title, text }, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index + 1}>
            <AccordionTrigger className={"text-base font-medium"}>
              {title}
            </AccordionTrigger>
            <AccordionPanel className={"text-md-medium text-black"}>
              {text}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Faq;
