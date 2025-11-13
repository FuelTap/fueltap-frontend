import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema } from './formsSchemas';
import { useLocation, useNavigate } from 'react-router';
import { MdKeyboardArrowDown } from 'react-icons/md';

const RegisterForm = () => {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
    },
  });
  const location = useLocation();
  console.log(location);
  const { registerAs } = location.state || 'customer';

  const navigate = useNavigate();
  function onSubmit(data, e) {
    e?.preventDefault();

    const cleanedPhone = data.phone.startsWith('0')
      ? data.phone.slice(1)
      : data.phone;
    navigate('/confirm-password', {
      state: { ...data, phone: cleanedPhone, registerAs },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => console.log(data))}
        className="flex h-[65vh] flex-col space-y-6 md:h-full"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'text-lg-medium'}>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Ochife Ogechukwu" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'text-lg-medium'}>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="fueltap@support.com" {...field} />
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
              <FormLabel className={'text-lg-medium'}>Phone Number</FormLabel>
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
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
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
        <div className="mb-4 bg-white max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:p-4">
          <Button type="submit" size={'full'} className="text-md-medium w-full">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
