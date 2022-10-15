import { useSelector } from 'react-redux';

export default function Balance() {
  const { transactions } = useSelector((state) => state.transaction);

  const calculateTransaction = () => {
    let amount = 0;
    transactions.forEach((element) => {
      if (element.type === 'income') {
        return (amount += element.amount);
      } else {
        return (amount -= element.amount);
      }
    });

    return amount;
  };

  console.log({ transactions });
  return (
    <div className='top_card'>
      <p>Your Current Balance</p>
      <h3>
        <span>৳ </span>
        <span>{transactions.length > 0 ? calculateTransaction() : 0} </span>
      </h3>
    </div>
  );
}
