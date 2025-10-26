import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/helpers';

const priceCards = [
  {
    companyLogo: '/assets/images/total.png',
    companyName: 'Total Energies',
    price: 985,
    DeliveryTime: '1-2 hrs',
    lastUpdated: '24 sept at 1:am',
    type: 'Petrol',
    location: 'Lekki, Lagos',
    bestPrice: true,
  },
  {
    companyLogo: '/assets/images/total.png',
    companyName: 'Mobil 1',
    price: 985,
    DeliveryTime: '1-2 hrs',
    lastUpdated: '24 sept at 1:am',
    type: 'Petrol',
    location: 'Lekki, Lagos',
    bestPrice: false,
  },
  {
    companyLogo: '/assets/images/total.png',
    companyName: 'RestoPark',
    price: 985,
    DeliveryTime: '1-2 hrs',
    lastUpdated: '24 sept at 1:am',
    type: 'Petrol',
    location: 'Lekki, Lagos',
    bestPrice: false,
  },
];

const PriceComparison = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl! font-semibold">Price Comparison</h1>
        <p className="text-grey-800 text-xl font-[400]">
          Compare prices from suppliers in real time
        </p>
      </div>

      <div className="my-6">filters and search</div>

      <section className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
        {priceCards.map(
          (
            {
              companyLogo,
              companyName,
              price,
              type,
              DeliveryTime,
              lastUpdated,
              location,
              bestPrice,
            },
            index
          ) => (
            <article
              className={`${bestPrice ? 'rounded-tr-none' : ''} border-neutra-500 relative h-[263px] space-y-8 rounded-3xl border-[0.3px] px-4 py-6 shadow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl`}
              key={index}
            >
              {bestPrice && (
                <div className="absolute -top-8 right-0 flex h-8 w-21 items-center justify-center rounded-t-xl bg-green-500 p-2 pb-1">
                  <p className="text-xs text-white!">Best Price</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={companyLogo}
                    className="border-neutra-500 h-16 w-16 rounded-sm border-[0.3px] p-2"
                    alt={companyName}
                  />
                  <div className="flex flex-col gap-2">
                    <h2>{companyName}</h2>
                    <h5 className="text-secondary-600 text-[14px] font-medium">
                      {type}
                    </h5>
                    <h6>{location}</h6>
                  </div>
                </div>

                <h2 className={`${bestPrice ? 'text-green-400' : ''} text-3xl`}>
                  {formatCurrency(price)}
                  <span className="text-neutra-1000 hidden text-right text-sm font-medium md:block">
                    per litre
                  </span>
                  <span className="text-neutra-1000 text-sm font-medium md:hidden">
                    /ltr
                  </span>
                </h2>
              </div>
              <div>
                <div className="text-neutra-1000 mb-2 flex items-center font-[400] md:justify-between">
                  <h5>Delivery Time:</h5>
                  <h5 className="text-black">{DeliveryTime}</h5>
                </div>
                <div className="text-neutra-1000 flex items-center font-[400] md:justify-between">
                  <h5>Last updated:</h5>
                  <h5>{lastUpdated}</h5>
                </div>
              </div>
              <Button size={'full'}>Update Price</Button>
            </article>
          )
        )}
      </section>
    </>
  );
};

export default PriceComparison;
