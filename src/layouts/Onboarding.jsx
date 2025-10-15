import Logo from '@/components/Logo';
import { Progress } from '@/components/ui/progress';
import RegisterForm from '@/features/register/RegisterForm';
import React from 'react';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { Outlet, useLocation, useNavigate } from 'react-router';

const indicatorMap = {
  '/register': {
    progressValue: 40,
    text: 'Secure your account',
    title: 'Create an Account',
  },
  '/confirm-password': {
    progressValue: 60,
    text: 'Secure your account',
    title: 'Create a Password',
  },
  '/verify-email': {
    progressValue: 90,
    title: 'Verify your email',
    text: 'Enter the OTP sent to your email',
  },
  '/role-selector': {
    progressValue: 10,
    text: 'Click to select',
    title: 'Select Role',
  },
  '/login': {
    progressValue: 50,
    text: 'We’re glad to have you',
    title: 'Login to Continue',
  },
};

const Onboarding = () => {
  const location = useLocation();

  const indicatorData = indicatorMap[location.pathname];

  return (
    <main className="flex h-screen w-screen justify-between overflow-hidden">
      <div className="mx-auto flex w-screen max-w-[512px] basis-full flex-col items-center sm:basis-1/2 lg:max-w-[720px]">
        <header className="flex w-full items-center justify-center border-b px-10 py-[12px] lg:px-20 lg:py-4">
          <Logo />
        </header>

        <div className="mx-auto mt-4 w-[95%] max-sm:h-[75%] md:mt-8 lg:max-w-[560px]">
          {indicatorData && (
            <Indicator
              progressValue={indicatorData.progressValue}
              text={indicatorData.text}
              title={indicatorData.title}
            />
          )}

          <Outlet />
        </div>
      </div>

      <div className="bg-neutra-600 hidden h-full w-1/2 border-2 md:block"></div>
    </main>
  );
};

export default Onboarding;

function Indicator({ progressValue, title, text }) {
  const navigate = useNavigate();
  return (
    <div className="mt-6 mb-4 flex flex-col lg:mt-0 lg:items-center">
      <div className="flex items-center gap-4 rounded-2xl">
        <RiArrowLeftSLine
          size={32}
          className={'bg-[#F3F4F4] sm:hidden'}
          onClick={() => navigate(-1)}
        />
        <div>
          <h1 className="text-primary font-pjs text-2xl font-[600]">{title}</h1>
          <p className="text-lg-regular mt-1 mb-4 lg:mt-2 lg:mb-6">{text}</p>
        </div>
      </div>
      <Progress value={progressValue} />
    </div>
  );
}
