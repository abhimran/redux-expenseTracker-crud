import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTransaction,
  createTransaction,
  editInActive,
} from '../features/transaction/transactionSlice';

export default function Form() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.transaction);
  const { editing } = useSelector((state) => state.transaction);

  useEffect(() => {
    if (editing.id) {
      setEditMode(true);

      setName(editing?.name);
      setType(editing?.type);
      setAmount(editing?.amount);
    } else {
      reset();
    }
  }, [editing]);

  const reset = () => {
    setName('');
    setType('');
    setAmount('');
  };

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );

    reset();
  };

  const handleCancelEdit = () => {
    dispatch(editInActive());
    reset();
    setEditMode(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      changeTransaction({
        id: editing?.id,
        data: {
          name,
          type,
          amount,
        },
      })
    );
    reset();
    setEditMode(false);
  };

  return (
    <div className='form'>
      <h3> {editMode ? 'Edit' : 'Add new'} transaction</h3>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className='form-group'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            required
            placeholder='enter title'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='form-group radio'>
          <label>Type</label>
          <div className='radio_group'>
            <input
              required
              type='radio'
              value='income'
              name='type'
              checked={type === 'income'}
              onChange={(e) => setType('income')}
            />
            <label>Income</label>
          </div>
          <div className='radio_group'>
            <input
              type='radio'
              value='expense'
              name='type'
              placeholder='Expense'
              checked={type === 'expense'}
              onChange={(e) => setType('expense')}
            />
            <label>Expense</label>
          </div>
        </div>

        <div className='form-group'>
          <label>Amount</label>
          <input
            type='number'
            required
            placeholder='enter amount'
            name='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button disabled={isLoading} className='btn' type='submit'>
          {editMode ? 'Update' : 'Add'} Transaction
        </button>

        {!isLoading && isError && (
          <p className='error'>There was an error occured</p>
        )}
      </form>

      {editMode && (
        <button className='btn cancel_edit' onClick={handleCancelEdit}>
          Cancel Edit
        </button>
      )}
    </div>
  );
}
