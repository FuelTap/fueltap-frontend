import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { BsEye, BsEyeSlash } from 'react-icons/bs';
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

import { useState } from 'react';
import { loginSchema } from './loginSchema';

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit() {}

  const [showPassword, setShowPassword] = useState(false);
  function handleToggle(setterFn) {
    setterFn((prev) => !prev);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[65vh] flex-col space-y-6"
      >
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'text-lg-medium'}>
                Create Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="create a password"
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                  />
                  {showPassword ? (
                    <BsEyeSlash
                      className="text-neutra-600 absolute top-1/2 right-1 -translate-1/2 cursor-pointer"
                      onClick={() => handleToggle(setShowPassword)}
                      size={18}
                    />
                  ) : (
                    <BsEye
                      className="text-neutra-600 absolute top-1/2 right-1 -translate-1/2 cursor-pointer"
                      onClick={() => handleToggle(setShowPassword)}
                      size={18}
                    />
                  )}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mb-4 justify-self-start max-sm:mt-auto">
          <Button
            type="submit"
            variant={'secondary'}
            size={'full'}
            className={'text-md-medium'}
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
