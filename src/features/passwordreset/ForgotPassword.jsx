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
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import InfoPopup from './InfoPopup';
import { axiosInstance } from '@/api/axios';

const schema = z.object({
  email: z
    .string({
      message: 'field can not be empty!.',
    })
    .email({
      message: 'Please enter a valid email address.',
    }),
});

const ForgotPassword = () => {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  async function onSubmit(data) {
    console.log(data);
    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post(
        'v1/auth/forgot-password',
        data
      );

      const { status, message } = response.data;
      if (status === 'success') {
        console.log(response.data);
        toast.success(message);
        setEmail(data.email);
        setShowPopup(true);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
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
                <FormLabel className={'text-lg-medium'}>
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="fueltap@support.com" {...field} />
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send email'}
            </Button>
          </div>
        </form>
      </Form>

      {showPopup && (
        <InfoPopup
          onClose={() => setShowPopup(false)}
          email={email}
          resend={() => onSubmit({ email })}
        />
      )}
    </>
  );
};

export default ForgotPassword;
