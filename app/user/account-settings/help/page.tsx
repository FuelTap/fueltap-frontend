import Faq from "@/components/user/account-settings/help/faq";
import SupportMap from "@/components/user/account-settings/help/SupportMap";
const chatOptions = [
  {
    title: "WhatsApp",
    description: "Chat with our support team on WhatsApp for quick assistance.",
    image: "/assets/others/whatsapp.svg",
  },
  {
    title: "Phone Support",
    description: "Speak directly with a  FuelTap representative.",
    image: "/assets/others/call.svg",
  },
  {
    title: "Email Support",
    description: "We love to hear from you. Send us an email for assistance.",

    image: "/assets/others/email.svg",
  },
];

const HelpPage = () => {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-sm md:text-lg font-semibold">How can we help?</h1>
        <p className="text-sm md:text-lg text-grey-800">
          Customize your app experience and notifications
        </p>
      </div>

      <section className="my-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {chatOptions.map((chat, index) => (
          <SupportMap
            title={chat.title}
            description={chat.description}
            image={chat.image}
            key={index}
          />
        ))}
      </section>

      <section>
        <Faq />
      </section>
    </div>
  );
};

export default HelpPage;
