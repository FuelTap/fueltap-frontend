import Home from '../pages/Home';
import Onboarding from '@/layouts/Onboarding';
import RegisterForm from '@/features/register/RegisterForm';
import PasswordForm from '@/features/register/PasswordForm';
import VerifyEmail from '@/features/register/VerifyEmail';
import RoleSelector from '@/features/register/RoleSelector';
import RegistrationSuccess from '@/components/Success';
import LoginForm from '@/features/login/LoginForm';
import Dashboard from '@/pages/Dashboard';
import User from '@/layouts/User';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    element: <Onboarding />,
    children: [
      {
        path: '/register',
        element: <RegisterForm />,
      },
      {
        path: '/confirm-password',
        element: <PasswordForm />,
      },
      {
        path: '/verify-email',
        element: <VerifyEmail />,
      },
      {
        path: '/role-selector',
        element: <RoleSelector />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      { path: '/success', element: <RegistrationSuccess /> },
    ],
  },

  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
  {
    path: '/user',
    element: <User />,
    children: [
      {
        index: true,
        path: '',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/admin',
    children: [],
  },
  {
    path: '/suppliers',
    children: [],
  },
];

export default routes;
