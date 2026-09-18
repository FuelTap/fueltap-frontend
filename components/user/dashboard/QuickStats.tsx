const QuickStats = () => {
  return (
    <div className="">
      <h3 className="font-pjs text-black text-base lg:text-xl font-semibold">
        Quick stats
      </h3>
      <div className="flex items-center justify-between">
        <div className="w-45 bg-white py-4 border-[0.5px] rounded-md border-gray-100 ps-3 pe-6">
          <h5 className="text-grey-800 font-medium text-xs md:text-base mb-6">
            Total Orders
          </h5>
          <p className="text-black text-base md:text-lg font-semibold">0</p>
        </div>
        {/* 2 */}
        <div className="w-45 bg-white py-4 border-[0.5px] rounded-md border-gray-100 ps-3 pe-6">
          <h5 className="text-grey-800 font-medium text-xs md:text-base mb-6">
            This Month
          </h5>
          <p className="text-black text-base md:text-lg font-semibold">0</p>
        </div>
        {/* 3 */}
        <div className="w-45 bg-white py-4 border-[0.5px] rounded-md border-gray-100  ps-3 pe-6">
          <h5 className="text-grey-800 font-medium text-xs md:text-base mb-6">
            Avg Delivery
          </h5>
          <p className="text-black text-base md:text-lg font-semibold">0</p>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
