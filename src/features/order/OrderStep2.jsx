import {
  fuelLiters,
  fuelType,
  orderOptions,
  weeks,
} from '@/components/Imports';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiTargetLock } from 'react-icons/bi';
import { HiOutlineCube } from 'react-icons/hi2';
import { LuAlarmClockCheck } from 'react-icons/lu';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router';
import { formSchema } from '../register/formsSchemas';
import TimePicker from '@/components/TimePicker';
import { FaRegCalendarAlt } from 'react-icons/fa';
import Searching from './Searching';
import { useOrder } from '@/contexts/OrderContext';

const orderFrequency = [
  {
    icon: <HiOutlineCube size={24} />,
    label: 'One-Time',
    description: 'Place a single order. Does NOT repeat',
  },
  {
    icon: <LuAlarmClockCheck size={24} />,
    label: 'Recurring',
    description: 'Schedule a future or  repeating order',
  },
];

const OrderStep2 = () => {
  // const location = useLocation();
  // const { address, orderType } = location.state;
  const { selectedAddress, orderType } = useOrder();
  console.log('address :', selectedAddress);
  const navigate = useNavigate();

  const [typeSelected, setTypeSelected] = useState(orderType);
  console.log(typeSelected);

  const [frequency, setFrequency] = useState('One-Time');
  const [type, setType] = useState('Petrol');
  const [amount, setAmount] = useState(10);

  const [time, setTime] = useState({ hour: '10', minute: '30' });
  const [activeDay, setActiveDay] = useState('Monday');

  const [searching, setSearching] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  const onSubmit = (values) => {
    const payload = {
      ...values,
      typeSelected,
      frequency,
      type,
      amount,
      time,
      activeDay,
    };

    // navigate to the searching route and pass the payload in location state
    navigate('searching');
  };

  if (searching) return <Searching />;
  return (
    <div className="h-[85dvh] w-screen max-w-[762px] overflow-hidden px-3 py-6 hover:overflow-y-scroll md:h-[90dvh] md:p-6">
      <div className="flex items-center justify-between">
        <h5 className="text-lg-medium">
          {selectedAddress?.display_name || 'empty'}
        </h5>
        <BiTargetLock className="text-2xl text-yellow-700" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-[20px] flex items-center gap-3">
            {orderOptions.map(({ key, label, icon }) => (
              <button
                type="button"
                className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-3 text-lg ${typeSelected === key ? 'border-primary-400 text-primary-400' : ''}`}
                key={key}
                onClick={() => {
                  setTypeSelected(key);
                }}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
          {typeSelected === 'personal' ? (
            // frequency
            <div className="mt-[20px]">
              <p>Frequency</p>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                {orderFrequency.map(({ description, label, icon }) => (
                  <button
                    type="button"
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border-[0.5px] p-3 text-start ${frequency === label ? 'border-secondary-400 text-secondary-400 bg-secondary-400/10' : ''}`}
                    key={label}
                    onClick={() => {
                      setFrequency(label);
                    }}
                  >
                    {icon}
                    <div className="flex flex-col">
                      <p>{label}</p>
                      <small className="text-grey-600 text-sm">
                        {description}
                      </small>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={'text-sm'}>Friend's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ochife Ogechukwu" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={'text-sm'}>Phone Number</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <div className="text-primary-400 bg-primary-50 flex items-center justify-center gap-2 rounded-l px-2">
                          <span className="text-xl">NGN</span>
                          <MdKeyboardArrowDown />
                        </div>

                        <Input
                          placeholder="90 22473 2723"
                          inputMode="numeric"
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ''
                            );
                          }}
                          className={
                            'focus-visible:border-ring focus-visible:ring-ring/50 rounded-l-none border-l-0 focus-visible:border-l-0 focus-visible:ring-[1px]'
                          }
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {/* recurring */}
          {frequency === 'Recurring' && (
            <div className="mt-8">
              <h4 className="text-sm">Set date and time</h4>
              <div>
                <input type="time" min="09:00" max="17:00" />

                <TimePicker
                  value={time}
                  onChange={setTime}
                  disabledTimes={[
                    { hour: '18', minute: '00' },
                    { hour: '18', minute: '30' },
                    { hour: '19', minute: '00' },
                    { hour: '19', minute: '30' },
                  ]}
                />
              </div>

              <div className="bg-secondary-400/10 rounded-2xl p-3">
                {/* here */}
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="text-sm">Every {activeDay}</h4>
                  <FaRegCalendarAlt />
                </div>
                <div className="flex items-center justify-between">
                  {weeks.map(({ day, label }) => (
                    <Button
                      type="button"
                      className={`${day === 'Sunday' && 'text-error!'} ${activeDay === day ? 'bg-secondary-400 hover:bg-secondary-400! text-white!' : 'bg-transparent'} basis-[14%] rounded-2xl p-2 text-gray-700 hover:bg-transparent`}
                      key={day}
                      onClick={() => setActiveDay(day)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* fuel type */}
          <div className="mt-[20px]">
            <h4 className="text-sm">Fuel Type</h4>
            <div className="bg-primary-50 mt-4 rounded-3xl">
              {fuelType.map(({ text }) => (
                <Button
                  key={text}
                  type="button"
                  className={` ${type === text ? 'bg-primary text-white!' : 'bg-transparent'} text-primary-400 hover:bg- w-1/3 rounded-3xl transition-colors duration-100 md:p-6`}
                  onClick={() => {
                    setType(text);
                  }}
                >
                  {text}
                </Button>
              ))}
            </div>
            <small className="text-gray-700">
              *LPG (Liquified Petroleum Gas) i.e cooking gas
            </small>
          </div>
          {/* amount */}
          <div className="mt-[20px]">
            <h4 className="text-sm">Amount</h4>
            <div className="mt-4 flex items-center justify-between">
              {fuelLiters.map(({ text }) => (
                <Button
                  type="button"
                  key={text}
                  className={` ${amount === text ? 'bg-yellow-600 text-white!' : 'bg-transparent'} hover:bg- basis-[24.5%] rounded-sm border-[0.5px] text-gray-700 transition-colors duration-100 md:p-6`}
                  onClick={() => {
                    setAmount(text);
                  }}
                >
                  <span>{text}L</span>
                </Button>
              ))}
            </div>
          </div>
          {/* submit */}
          <div className="mt-6">
            <Button
              // type="submit"
              type="button"
              onClick={() => {
                setSearching(true);
                setTimeout(() => {
                  setSearching(false);
                  navigate('/order/suppliers-found');
                }, 3000);
              }}
              variant={'secondary'}
              className={`h-[52px] w-full rounded-3xl p-6 text-white`}
            >
              Submit Order
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OrderStep2;
