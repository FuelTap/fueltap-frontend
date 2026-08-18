import SupportForm from "@/components/support/SupportForm";
import SupportMap from "@/components/support/SupportMap";

import Faq from "@/components/web/Faq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description: "feel free to contact us regarding any issue",
};

const chatOptions = [
  {
    title: "WhatsApp",
    description: "Chat with our support team on WhatsApp for quick assistance.",
    image: "assets/others/whatsapp.svg",
  },
  {
    title: "Phone Support",
    description: "Speak directly with a  FuelTap representative.",
    image: "assets/others/call.svg",
  },
  {
    title: "Email Support",
    description: "We love to hear from you. Send us an email for assistance.",

    image: "assets/others/email.svg",
  },
  {
    title: "Live Chat",
    description:
      "Get instant help  live chat. Our team is always ready to help",

    image: "assets/others/chat.svg",
  },
];

export default function SupportPage() {
  return (
    <main className="container mx-auto my-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-blue-600">How can we help?</h1>
        <p className="text-grey-800 mt-1 text-xl font-normal">
          We’re here to help. Reach us through any of the following contacts.
        </p>
      </div>

      <section className="my-8 grid gap-6 grid-cols-2 lg:grid-cols-3">
        {chatOptions.map((chat, index) => (
          <SupportMap
            title={chat.title}
            description={chat.description}
            image={chat.image}
            key={index}
          />
        ))}
      </section>

      <section className="mt-10 flex  gap-14">
        <div className="basis-1/2">
          <SupportForm />
        </div>

        <div className="basis-1/2">
          <Faq />
        </div>
      </section>
    </main>
  );
}
