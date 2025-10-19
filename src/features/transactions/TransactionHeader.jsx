import { MdFilterList } from 'react-icons/md';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';

const TransactionHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <RiArrowLeftSLine
        size={32}
        className={'cursor-pointer bg-[#F3F4F4]'}
        onClick={() => navigate(-1)}
      />
      <h2 className="font-semibold text-black md:text-3xl">
        Transaction History
      </h2>

      <MdFilterList className="text-neutra-600 cursor-pointer" size={30} />
    </div>
  );
};

export default TransactionHeader;
