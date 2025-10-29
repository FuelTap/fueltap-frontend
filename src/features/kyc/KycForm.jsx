import { useState } from 'react';
import { filemage } from '@/components/Imports';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GrNotes } from 'react-icons/gr';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { SlCloudUpload } from 'react-icons/sl';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { kycSchema } from '@/features/kyc/kycSchema';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
const KycForm = () => {
  const [useBVN, setUseBVN] = useState(true);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      bvn: '',
      nin: '',
      proofOfAddress: undefined,
    },
  });
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  async function onSubmit(values) {
    setLoading(true);
    try {
      const identifier = useBVN ? values.bvn : values.nin;

      // 1️⃣ Submit BVN/NIN

      const identityRes = await axiosPrivate.post('v1/kyc/identity', {
        [useBVN ? 'bvn' : 'nin']: identifier,
      });

      console.log(identityRes.data);
      if (identityRes.data?.status !== 'success') {
        throw new Error(
          identityRes.data?.message || 'Identity verification failed'
        );
      }

      // 2️⃣ Upload proof of address (image)
      const formData = new FormData();
      formData.append('file', values.proofOfAddress[0]);

      const addressRes = await axiosPrivate.post(
        'v1/kyc/proof-of-address',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(addressRes);

      if (addressRes.data?.status !== 'success') {
        throw new Error(
          addressRes.data?.message || 'Proof of address upload failed'
        );
      }

      toast.success('✅ Identity verified! Proceed to liveness check.');
      navigate('/user/verify/liveness');
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data.data?.message ||
        '⚠️ Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative">
          <div className="absolute top-5 left-0 -z-10 h-[71%] w-[3px] -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,_#d1d5db_0_10px,_transparent_10px_20px)] md:hidden"></div>

          {/* BVN/NIN Section */}
          <div className="relative mx-auto mt-8 w-[95%] space-y-6 rounded-[12px] px-4 py-3 md:w-full md:bg-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-green-600">
                <GrNotes className="absolute top-2 -left-2 -translate-x-1/2 translate-y-1/2 md:static md:text-lg" />
                <h3 className="text-[18px] font-semibold text-green-600 md:text-xl lg:text-2xl">
                  Provide {useBVN ? 'BVN' : 'NIN'}
                </h3>
              </div>
              <MdKeyboardArrowUp className="hidden text-xl font-medium md:block" />
            </div>

            {/* Toggle Switch */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={useBVN}
                    onChange={() => setUseBVN(!useBVN)}
                  />
                  <div className="peer peer-checked:bg-accent h-6 w-11 rounded-full bg-gray-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
                </label>
                <span className="font-medium text-black">
                  {useBVN ? 'BVN' : 'NIN'}
                </span>
              </div>
              <small className="text-gray-500">
                Toggle to change from BVN to NIN
              </small>
            </div>

            {/* Input field */}
            {useBVN ? (
              <FormField
                control={form.control}
                name="bvn"
                render={({ field }) => (
                  <FormItem>
                    <Label className="font-medium text-black">
                      Bank Verification Number (BVN)
                    </Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your BVN"
                        {...field}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="nin"
                render={({ field }) => (
                  <FormItem>
                    <Label className="font-medium text-black">
                      National Identification Number (NIN)
                    </Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your NIN"
                        {...field}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Proof of Address Section */}
          <div className="relative mx-auto mt-1 w-[95%] space-y-6 rounded-[12px] px-4 py-3 md:w-full md:bg-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-green-600">
                <SlCloudUpload className="absolute top-2 -left-2 -translate-x-1/2 translate-y-1/2 md:static" />
                <h3 className="text-[18px] font-semibold text-green-600 md:text-xl lg:text-2xl">
                  Upload Proof of Address
                </h3>
              </div>
              <MdKeyboardArrowUp className="hidden text-xl font-medium md:block" />
            </div>

            <FormField
              control={form.control}
              name="proofOfAddress"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Label
                        htmlFor="file"
                        className="flex flex-col items-start font-medium text-black"
                      >
                        Upload image of a valid ID. e.g NIN, Driver’s license,
                        international passport.
                        <img
                          src={filemage}
                          alt="click to upload"
                          className="mt-1 cursor-pointer"
                        />
                      </Label>
                      <small className="mt-2 text-gray-500">
                        Supported formats include PNG, JPEG, PDF.
                      </small>
                      <Input
                        id="file"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => field.onChange(e.target.files)}
                        className="invisible"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant={'secondary'}
            size={'full'}
            className={'text-white'}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default KycForm;
