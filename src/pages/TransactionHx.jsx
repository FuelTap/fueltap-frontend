import GetTransactions from '@/features/transactions/GetTransactions';
import TransactionBody from '@/features/transactions/TransactionBody';
import TransactionHeader from '@/features/transactions/TransactionHeader';

const TransactionHx = () => {
  const { data, error } = GetTransactions();
  console.log(data);
  console.log(error);
  return (
    <div>
      <TransactionHeader />

      <TransactionBody />
    </div>
  );
};

export default TransactionHx;
