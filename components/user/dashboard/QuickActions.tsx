import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Plus } from "@/components/animate-ui/icons/plus";
import { Send } from "@/components/animate-ui/icons/send";
import { buttonVariants } from "@/components/ui/button";
import { Download } from "@/components/animate-ui/icons/download";
const actions = [
  {
    to: "",
    icon: <Plus />,
    title: "Fund",
    color: "#C99901", // yellow
    bg: "#FFF8DB",
  },
  {
    to: "",
    icon: <Send />,
    title: "Send",
    color: "#4E71E8", // blue
    bg: "#EAF0FF",
  },
  {
    to: "",
    icon: <Download />,
    title: "Withdraw",
    color: "#DF1125", // red
    bg: "#FFEAEA",
  },
];

const QuickActions = () => {
  return (
    <div className="mt-3 md:mt-4 lg:mt-10">
      <div className="flex items-center justify-between">
        {actions.map(({ icon, to, title, color, bg }, index) => (
          <div
            className="flex w-45 border-[0.5px] rounded-md border-gray-200/60 items-center justify-center py-4 ps-3 pe-6"
            key={index}
          >
            <div className="group flex flex-col items-center gap-4">
              <AnimateIcon
                className={`${buttonVariants({ variant: "icon", size: "icon" })}`}
                style={{
                  backgroundColor: bg,
                  color: color,
                }}
                animateOnHover={true}
              >
                {icon}
              </AnimateIcon>
              <h5 className="font-medium">{title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
