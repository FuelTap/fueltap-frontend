// import { getWalletBalance } from '@/features/userDashboard/api';s
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  //   const axiosPrivate = useAxiosPrivate();

  //   async function balance() {
  //     const response = await axiosInstance('v1/wallet/balance');
  //     console.log(response);
  //   }

  //   const { data, error, refresh } = useQuery({
  //     queryKey: ['aza'],
  //     //   queryFn: () => getWalletBalance(axiosPrivate),
  //   });

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('please use context inside <AppProvider>');
  }
  return context;
};

export { AppProvider as default, useAppContext };
