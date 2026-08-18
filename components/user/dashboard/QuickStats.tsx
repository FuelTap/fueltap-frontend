const QuickStats = () => {
  return (
    <div className="mt-10">
      <h3 className="font-pjs text-neutra-900 text-2xl font-normal">
        Quick stats
      </h3>
      <div className="flex items-center justify-between">
        <div className="w-45 py-4 border-[0.5px] rounded-md border-gray-100 ps-3 pe-6">
          <h5 className="text-neutra-1000 mb-6">Total Orders</h5>
          <p className="text-neutra-1000">0</p>
        </div>
        {/* 2 */}
        <div className="w-45 py-4 border-[0.5px] rounded-md border-gray-100 ps-3 pe-6">
          <h5 className="text-neutra-1000 mb-6">This Month</h5>
          <p className="text-neutra-1000">0</p>
        </div>
        {/* 3 */}
        <div className="w-45 py-4 border-[0.5px] rounded-md border-gray-100  ps-3 pe-6">
          <h5 className="text-neutra-1000 mb-6">Avg Delivery</h5>
          <p className="text-neutra-1000">0</p>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
