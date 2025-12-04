import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
const GetTransactions = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['transactionHistory'],
    queryFn: async () => {
      const res = await axiosPrivate.get('/v1/wallet/transaction');
      return res.data;
    },
  });
};
export default GetTransactions;
