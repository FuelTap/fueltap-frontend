import TransactionBody from "@/components/user/transactions/TransactionBody";
import TransactionHeader from "@/components/user/transactions/TransactionHeader";

const TransactionHxPage = () => {
  //   const { data, error } = GetTransactions();
  return (
    <div>
      <TransactionHeader />

      <TransactionBody />
    </div>
  );
};

export default TransactionHxPage;
