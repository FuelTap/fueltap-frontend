import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { changePasswordSchema } from './schema';
const ChangePassword = () => {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {},
  });

  function onSubmit() {}
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  function handleToggle(setterFn) {
    setterFn((prev) => !prev);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[65vh] flex-col space-y-6 md:h-full"
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'text-lg-medium'}>Old Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="enter your last password"
                    autoComplete="new-password"
                    type={showOldPassword ? 'text' : 'password'}
                    {...field}
                  />
                  {showOldPassword ? (
                    <BsEyeSlash
                      className="text-neutra-600 absolute top-1/2 right-1 -translate-1/2 cursor-pointer"
                      onClick={() => handleToggle(setShowOldPassword)}
                      size={18}
                    />
                  ) : (
                    <BsEye
                      className="text-neutra-600 absolute top-1/2 right-1 -translate-1/2 cursor-pointer"
                      onClick={() => handleToggle(setShowOldPassword)}
                      size={18}
                    />
                  )}
                </div>
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
                    autoComplete="new-password"
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'text-lg-medium'}>
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                    {...field}
                    type={showConfPassword ? 'text' : 'password'}
                  />
                  {showConfPassword ? (
                    <BsEyeSlash
                      className="text-neutra-600 absolute top-1/2 right-1 -translate-1/2 cursor-pointer"
                      onClick={() => handleToggle(setShowConfPassword)}
                      size={18}
                    />
                  ) : (
                    <BsEye
                      className="text-neutra-600 absolute top-1/2 right-1 -translate-1/2 cursor-pointer"
                      onClick={() => handleToggle(setShowConfPassword)}
                      size={18}
                    />
                  )}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mb-4 bg-white max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:p-4">
          <Button
            type="submit"
            size={'full'}
            // disabled={isSubmitting}
            className={'text-md-medium'}
          >
            Change
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePassword;
