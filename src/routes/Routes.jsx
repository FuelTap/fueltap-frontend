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
import TransactionHx from '@/pages/TransactionHx';
import TransactionDetails from '@/features/transactions/TransactionDetails';
import ProtectedRoute from './ProtectedRoute';
import AccountSettings from '@/pages/AccountSettings';
import PriceComparison from '@/pages/PriceComparison';
import Orders from '@/pages/Orders';

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
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'account-settings',
        element: <AccountSettings />,
      },
      {
        path: 'transaction-history',
        element: <TransactionHx />,
      },
      {
        path: 'prices',
        element: <PriceComparison />,
      },
      {
        path: 'orders',
        element: <Orders />,
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
