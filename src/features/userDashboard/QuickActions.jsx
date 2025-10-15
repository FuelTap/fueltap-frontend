import { Button } from '@/components/ui/button';
import { FiPlus, FiSend } from 'react-icons/fi';
import { RxDownload } from 'react-icons/rx';

const actions = [
  {
    to: '',
    icon: <FiPlus />,
    title: 'Fund',
    color: '#C99901', // yellow
    bg: '#FFF8DB',
  },
  {
    to: '',
    icon: <FiSend />,
    title: 'Send',
    color: '#4E71E8', // blue
    bg: '#EAF0FF',
  },
  {
    to: '',
    icon: <RxDownload />,
    title: 'Withdraw',
    color: '#DF1125', // red
    bg: '#FFEAEA',
  },
];

const QuickActions = () => {
  return (
    <div className="mt-3 md:mt-4 lg:mt-10">
      <div className="flex items-center justify-between">
        {actions.map(({ icon, to, title, color, bg }, index) => (
          <div
            className="flex w-[180px] items-center justify-center py-4 ps-3 pe-6"
            key={index}
          >
            <div className="group flex flex-col items-center gap-4">
              <Button
                variant="icon"
                size="icon"
                className="transform p-2 transition duration-300 hover:scale-110"
                style={{
                  backgroundColor: bg,
                  color: color,
                }}
              >
                {icon}
              </Button>
              <h5 className="font-medium">{title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
