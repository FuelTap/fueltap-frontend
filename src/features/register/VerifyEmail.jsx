import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { otpSchema } from './formsSchemas';
import { useLocation, useNavigate } from 'react-router';
import { axiosInstance } from '@/api/axios';
import { toast } from 'sonner';
import { useState } from 'react';

const VerifyEmail = () => {
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data) => {
    const payload = {
      email,
      otp: data.otp,
    };

    try {
      setIsSubmitting(true);
      const otpResponse = await axiosInstance.post(
        '/v1/auth/account-verification',
        payload
      );

      const { message } = otpResponse.data;
      toast.success(message);

      navigate('/success');
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[70vh] flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg-medium">Enter OTP</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field} className="w-full">
                  <InputOTPGroup className="flex w-full justify-between">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} className="h-12 flex-1" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mb-4 justify-self-start max-sm:mt-auto">
          <Button
            type="submit"
            size="full"
            variant="secondary"
            className="text-md-medium"
            disabled={form.watch('otp').length !== 6 || isSubmitting}
          >
            {isSubmitting ? 'Authenticating...' : 'Verify'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VerifyEmail;
