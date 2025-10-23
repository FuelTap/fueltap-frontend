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
import { useScreenSize } from '@/hooks/useScreenSize';
import { useEffect, useState } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bankAccountSchema } from './schemas';
import bankData from '../../../banks.json';
import { SearchableSelect } from '@/components/ui/SearchableSelect';
import { handleNumericInput, preventInvalidKeys } from '@/utils/helpers';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { toast } from 'sonner';

const LinkBank = ({ onClose }) => {
  const form = useForm({
    resolver: zodResolver(bankAccountSchema),
  });

  const axiosPrivate = useAxiosPrivate();
  // code to check when bankname and number has been selected and fetch account name

  const [isResolving, setIsResolving] = useState(false);
  const [resolved, setResolved] = useState(false);

  const bankName = form.watch('bankName');
  const accountNumber = form.watch('accountNumber');
  useEffect(() => {
    async function fetchAccountName() {
      if (bankName && accountNumber?.length === 10) {
        setIsResolving(true);
      }
      try {
        console.log(bankName, accountNumber);
        const res = await axiosPrivate.post('v1/account/verify-bank', {
          bankName,
          accountNumber,
        });
        console.log(res.data);
        // const fetchedName = res.data?.accountName;
        // form.setValue('accountName', fetchedName);
        setResolved(true);

        toast.success('success');
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
        setResolved(false);
      } finally {
        setIsResolving(false);
      }
    }

    if (bankName && accountNumber?.length === 10) fetchAccountName();
  }, [bankName, accountNumber, axiosPrivate, form]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      // const response = await axiosPrivate.post('v1/account/add-bank', data);

      // console.log(response.data.data);
    } catch (error) {
      const message =
        error.response?.data?.data.message ||
        error.message ||
        'Failed to add bank account. Please try again later.';
      toast.error(message);
    }
  };

  const { isSmallScreen } = useScreenSize(500);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) onClose();
  }, [open, onClose]);

  const allBankNames = bankData.map((bankObject) => bankObject.name);

  // 🧠 Shared form layout (used for both mobile + desktop)
  const formContent = (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg-medium">Bank Name</FormLabel>
              <FormControl>
                <SearchableSelect
                  items={allBankNames}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select your bank"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg-medium">Account Number</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your 10 digit number"
                  {...field}
                  onChange={(e) => handleNumericInput(e, field, 10)}
                  onKeyDown={preventInvalidKeys}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg-medium">Account Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={
                    isResolving
                      ? 'Verifying...'
                      : 'Account name will appear here'
                  }
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button size="full" type="submit" disabled={!resolved || isResolving}>
          {isResolving ? 'Verifying...' : 'Continue'}
        </Button>
      </form>
    </Form>
  );

  // 🧱 Render different containers for small and large screens
  if (isSmallScreen) {
    return (
      <div
        className={`fixed inset-0 bg-black/25 backdrop-blur-xs transition-opacity duration-500 ease-in-out ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed bottom-0 left-0 flex min-h-[400px] w-screen transform flex-col justify-between space-y-6 rounded-t-4xl bg-white p-4 text-center shadow-lg transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <h5 className="text-primary">Link Bank Account</h5>
            <LiaTimesSolid
              onClick={onClose}
              className="cursor-pointer text-sm"
            />
          </div>

          {formContent}
        </div>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="w-[588px] text-center md:rounded-xl"
      >
        <DialogHeader>
          <DialogTitle className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <h5 className="text-primary">Link Bank Account</h5>
              <small className="text-sm font-[300]">Select your bank</small>
            </div>
            <LiaTimesSolid
              onClick={onClose}
              className="cursor-pointer text-sm"
            />
          </DialogTitle>

          <DialogDescription className="mt-4">{formContent}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LinkBank;
