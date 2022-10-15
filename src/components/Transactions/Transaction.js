import { useDispatch } from 'react-redux';
import deleteImage from '../../assets/images/delete.svg';
import editImage from '../../assets/images/edit.svg';
import {
  editActive,
  removeTransaction,
} from '../../features/transaction/transactionSlice';

export default function Transaction({ transaction }) {
  const dispatch = useDispatch();
  const { id, name, amount, type } = transaction || {};

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className='right'>
        <p>৳ {amount}</p>
        <button className='link'>
          <img
            alt='Edit'
            className='icon'
            src={editImage}
            onClick={handleEdit}
          />
        </button>
        <button className='link'>
          <img
            alt='Delete'
            className='icon'
            src={deleteImage}
            onClick={handleDelete}
          />
        </button>
      </div>
    </li>
  );
}
