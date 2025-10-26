import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { RiArrowLeftSLine, RiDeleteBin5Line } from 'react-icons/ri';
import { useNavigate, useSearchParams } from 'react-router';
import { GrLocation } from 'react-icons/gr';
import { IoIosRefresh } from 'react-icons/io';
import { formatCurrency } from '@/utils/helpers';
import { BiTargetLock } from 'react-icons/bi';
import { LuPlus } from 'react-icons/lu';

const Orders = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get('time') || 'Past';

  console.log(active);
  return (
    <>
      <div className="flex items-center gap-8">
        <RiArrowLeftSLine
          size={32}
          className={'hidden cursor-pointer rounded-full bg-gray-100 md:block'}
          onClick={() => navigate(-1)}
        />
        <div>
          <h2 className="mb-2 text-2xl font-semibold text-blue-600 md:text-3xl">
            Orders
          </h2>
          <p className="font-[400] text-gray-800">
            Track your upcoming and past orders. Click to see full order
            summaries.
          </p>
        </div>
      </div>

      <div className="bg-primary-50 mt-4 rounded-3xl">
        {[
          {
            text: 'Upcoming',
          },
          {
            text: 'Past',
          },
        ].map(({ text }) => (
          <Button
            key={text}
            className={` ${active === text ? 'bg-primary text-white!' : 'bg-transparent'} text-primary-400 hover:bg- w-1/2 rounded-3xl transition-colors duration-100 md:p-6`}
            onClick={() => {
              searchParams.set('time', text);
              setSearchParams(searchParams);
            }}
          >
            {text}
          </Button>
        ))}
      </div>

      <main className="mt-8">
        {active === 'Upcoming' ? (
          <>
            <article className="border-neutra-500 relative mb-2 flex h-[200px] items-center justify-between gap-4 rounded-[20px] border bg-green-400 p-5 text-white shadow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <GrLocation size={22} className="text-2xl" />
              <div className="ml-3.5 flex flex-1 flex-col gap-3.5">
                <small className="text-[20px] font-[400]">6th Oct</small>
                <h5 className="text-[20px] font-medium">5b Ikoyi Road</h5>
                <h5 className="text-[20px] font-medium">Total Energies</h5>
                <h5 className="text-[20px] font-medium">
                  {formatCurrency(9800)}
                </h5>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <BiTargetLock
                  size={22}
                  className={
                    '-rotate-90 cursor-pointer rounded-full text-green-500'
                  }
                />
              </span>
            </article>
            <article className="border-neutra-500 relative flex h-[200px] items-center justify-between gap-4 rounded-[20px] border p-5 shadow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <GrLocation size={22} className="text-2xl text-gray-700" />
              <div className="ml-3.5 flex flex-1 flex-col gap-3.5">
                <small className="text-[20px] font-[400] text-gray-700">
                  6th Oct
                </small>
                <h5 className="text-[20px] font-medium">5b Ikoyi Road</h5>
                <h5 className="text-[20px] font-medium text-blue-500">
                  Total Energies
                </h5>
                <h5 className="text-secondary-600 text-[20px] font-medium">
                  {formatCurrency(9800)}
                </h5>
              </div>

              <span
                className={
                  'flex h-12 w-12 items-center justify-center rounded-full bg-red-100/90 p-2 text-red-400/90 group-hover:bg-red-200 group-hover:text-red-400'
                }
              >
                <RiDeleteBin5Line />
              </span>
            </article>
          </>
        ) : (
          <>
            <h3 className="mb-4 text-[26px] font-medium">October 2025</h3>
            <div className="flex flex-col items-center gap-4 overflow-x-hidden hover:overflow-x-auto md:flex-row">
              {[...Array(6)].map((_, index) => (
                <article
                  className="border-neutra-500 relative flex h-[200px] w-full items-start justify-between gap-4 rounded-[20px] border p-5 shadow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:w-[410px] md:min-w-[400px]"
                  key={index}
                >
                  <GrLocation size={22} className="text-2xl text-gray-700" />
                  <div className="ml-3.5 flex flex-1 flex-col gap-3.5">
                    <small className="text-[20px] font-[400] text-gray-700">
                      6th Oct
                    </small>
                    <h5 className="text-[20px] font-medium">5b Ikoyi Road</h5>
                    <h5 className="text-[20px] font-medium text-blue-500">
                      Total Energies
                    </h5>
                    <h5 className="text-secondary-600 text-[20px] font-medium">
                      {formatCurrency(9800)}
                    </h5>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <IoIosRefresh
                      size={22}
                      className={
                        '-rotate-90 cursor-pointer rounded-full text-green-500'
                      }
                    />
                  </span>
                </article>
              ))}
            </div>
          </>
        )}
        <span className="bg-primary fixed right-[10%] bottom-[7%] z-50! cursor-pointer rounded-full p-2 text-4xl text-white md:right-26 md:bottom-24">
          <LuPlus />
        </span>
      </main>
    </>
  );
};

export default Orders;
