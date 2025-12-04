import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useScreenSize } from '@/hooks/useScreenSize';
import { useEffect, useState } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { amountSchema } from './schemas';
import './FundWallet.css';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { toast } from 'sonner';

const FundWallet = ({ onClose }) => {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(amountSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const axiosPrivate = useAxiosPrivate();
  async function onSubmit(data) {
    try {
      const response = await axiosPrivate.post('v1/wallet/add-funds', data);

      console.log(response.data);
      const { message, status, data: paymentData } = response.data;
      if (status === 'success') {
        toast.success(message);
        const { authorization_url, access_code, referecne } = paymentData;
        window.location.href = authorization_url;
      }
    } catch (error) {
      toast.error(error.message);
    }

    // onClose();
  }
  const { isSmallScreen } = useScreenSize(500);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) onClose();
  }, [open, onClose]);

  if (isSmallScreen) {
    return (
      <>
        <div
          className={`fixed inset-0 bg-black/25 backdrop-blur-xs transition-opacity duration-500 ease-in-out ${
            open ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`fixed bottom-0 left-0 flex min-h-[332px] w-screen transform flex-col justify-between space-y-6 rounded-t-4xl bg-white p-4 text-center shadow-lg transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="flex items-center justify-between">
              <h5 className="text-primary">Fund Your Wallet</h5>
              <LiaTimesSolid
                onClick={onClose}
                className="cursor-pointer text-sm"
              />
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-6"
              >
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={'text-lg-medium'}>
                        Amount (₦)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={'number'}
                          placeholder="0.00"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="no-spinner"
                        />
                      </FormControl>
                      <small>+20% charge</small>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button variant={'secondary'} size={'full'} type="submit">
                  Continue
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-[480px] text-center md:rounded-xl"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <h5 className="text-primary">Fund Your Wallet</h5>
              <div className="flex items-center gap-2">
                <LiaTimesSolid
                  onClick={onClose}
                  className="cursor-pointer text-sm"
                />
              </div>
            </DialogTitle>

            <DialogDescription className="mt-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={'text-lg-medium'}>
                          Amount (₦)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type={'number'}
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            className="no-spinner"
                          />
                        </FormControl>
                        <small>+20% charge</small>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button variant={'secondary'} size={'full'} type="submit">
                    Continue
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FundWallet;
