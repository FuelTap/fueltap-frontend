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
import { passwordSchema } from './formsSchemas';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { axiosInstance } from '@/api/axios';
import { toast } from 'sonner';
const PasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { fullName, registerAs, email, phone } = location.state;

  async function onSubmit(data) {
    const payload = {
      full_name: fullName,
      email: email,
      phone_number: phone,
      password: data.password,
      confirm_password: data.confirmPassword,
      role: registerAs,
    };
    console.log(payload);

    try {
      setIsSubmitting(true);
      const registerResponse = await axiosInstance.post(
        '/v1/auth/register',
        payload
      );

      const { message } = registerResponse.data;
      toast.success(message);

      navigate('/verify-email', { state: { email } });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

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

        <div className="max-sm:mt-auto">
          <Button
            type="submit"
            size={'full'}
            disabled={!form.formState.isValid || isSubmitting}
            className={'text-md-medium'}
          >
            {isSubmitting ? 'Creating...' : 'Next'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PasswordForm;
