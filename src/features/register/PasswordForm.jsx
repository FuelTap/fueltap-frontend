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

  const password = form.watch('password') || '';

  const rules = {
    length: password.length > 7 && password.length <= 20,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { fullName, registerAs, email, phone } = location.state || '';

  async function onSubmit(data) {
    const payload = {
      full_name: fullName,
      email: email,
      phone_number: phone,
      password: data.password,
      confirm_password: data.confirmPassword,
      role: registerAs,
    };

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
      if (error.code === 'ERR_NETWORK') {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message || 'something went wrong');
      }
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
        className="flex h-[65vh] flex-col space-y-4 md:h-full"
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
                    className={''}
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

        {/* messages */}

        <ul className="list-disc space-y-1">
          <li className={rules.length ? 'text-green-600' : 'text-gray-500'}>
            Password should be 8-20 characters long
          </li>

          <li className={rules.uppercase ? 'text-green-600' : 'text-gray-500'}>
            At least one uppercase letter
          </li>

          <li className={rules.lowercase ? 'text-green-600' : 'text-gray-500'}>
            At least one lowercase letter
          </li>

          <li className={rules.number ? 'text-green-600' : 'text-gray-500'}>
            At least one number
          </li>

          <li className={rules.special ? 'text-green-600' : 'text-gray-500'}>
            At least one special character: @ ! # $ % & =
          </li>
        </ul>

        <div className="mb-4 bg-white max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:p-4">
          <Button
            type="submit"
            size={'full'}
            disabled={isSubmitting}
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
