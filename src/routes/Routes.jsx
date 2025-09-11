import Home from '../pages/Home';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <div>Register Page</div>,
  },
  {
    path: '/login',
    element: <div>Login Page</div>,
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
  {
    path: '/user',
    children: [],
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
