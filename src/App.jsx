import { createBrowserRouter, RouterProvider } from 'react-router';
import routes from './routes/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './store';
import { Toaster } from 'sonner';
import AppProvider from './contexts/AppContext';

const queryClient = new QueryClient();
const App = () => {
  const router = createBrowserRouter(routes);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
        <Toaster />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
