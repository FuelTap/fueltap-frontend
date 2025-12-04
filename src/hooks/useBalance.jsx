import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';
const useBalance = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['balance'],
    queryFn: async () => {
      const res = await axiosPrivate.get('/v1/wallet/balance');
      return res.data;
    },
  });
};
export default useBalance;
