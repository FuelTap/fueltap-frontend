import { filemage, kycImage } from '@/components/Imports';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { CiCamera } from 'react-icons/ci';
import { GrNotes } from 'react-icons/gr';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { SlCloudUpload } from 'react-icons/sl';

function KYC() {
  const [useBVN, setUseBVN] = useState(true);
  return (
    <div className="mx-auto max-w-[606px]">
      <div className="flex flex-col items-center gap-4 md:text-center">
        <img
          src={kycImage}
          className="max-sm:h-19 max-sm:w-30"
          alt="kyc image"
        />
        <h2 className="text-primary text-2xl font-semibold max-sm:self-start md:text-3xl">
          Verify Your Identity
        </h2>
        <p className="text-lg-regular leading-6">
          To ensure the security of your account and comply with regulatory
          requirements, we need to verify your identity. You will be done in{' '}
          <span className="font-semibold text-black">5 mins. </span>
        </p>
      </div>

      <div className="relative">
        <div className="absolute top-5 left-0 -z-10 h-[71%] w-[3px] -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,_#d1d5db_0_10px,_transparent_10px_20px)] md:hidden"></div>
        <div className="relative mx-auto mt-8 w-[95%] space-y-6 rounded-[12px] px-4 py-3 md:w-full md:bg-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 border-4 text-green-600">
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
          <div>
            <Label className="font-medium text-black">
              {useBVN
                ? 'Bank Verification Number (BVN)'
                : 'National Identification Number (NIN)'}
            </Label>
            <Input
              type="text"
              placeholder={useBVN ? 'Enter your BVN' : 'Enter your NIN'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500! focus:ring-green-500!"
            />
          </div>
        </div>

        <div className="relative mx-auto mt-1 w-[95%] space-y-6 rounded-[12px] px-4 py-3 md:w-full md:bg-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-green-600">
              <SlCloudUpload className="absolute top-2 -left-2 -translate-x-1/2 translate-y-1/2 md:static" />
              <h3 className="text-[18px] font-semibold text-green-600 md:text-xl lg:text-2xl">
                Upload ID image
              </h3>
            </div>
            <MdKeyboardArrowUp className="hidden text-xl font-medium md:block" />
          </div>

          {/* file field */}
          <div>
            <Label
              for="file"
              className="flex flex-col items-start font-medium text-black"
            >
              Upload image of a valid ID. e.g NIN, Driver’s license,
              international passport.
              {/* <div className="flex h-30 flex-col items-center justify-center py-7">

            </div> */}
              <img
                src={filemage}
                alt="click to upload"
                className="mt-1 cursor-pointer"
              />
            </Label>
            <small className="mt-2">
              Supported formats include PNG, JPEG, PDF.
            </small>

            <Input
              id="file"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              placeholder={'Click to upload'}
              className="invisible"
            />
          </div>
        </div>

        {/* liveness section */}
        <div className="relative mx-auto mt-1 w-[95%] space-y-6 rounded-[12px] px-4 py-3 md:w-full md:bg-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-green-600">
              <CiCamera className="absolute top-2 -left-2 -translate-x-1/2 translate-y-1/2 md:static" />
              <h3 className="text-[18px] font-semibold text-green-600 md:text-xl lg:text-2xl">
                Liveness Check
              </h3>
            </div>
            <MdKeyboardArrowUp className="hidden text-xl font-medium md:block" />
          </div>

          {/* file field */}
          <div>
            <img
              src={filemage}
              alt="click to upload"
              className="mt-1 cursor-pointer"
            />
          </div>
        </div>

        <Button variant={'secondary'} size={'full'} className={'text-white'}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default KYC;
