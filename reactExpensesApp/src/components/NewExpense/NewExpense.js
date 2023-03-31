import React from 'react';
import ExpenseForm from './ExpenseForm';

import './NewExpense.css';

const NewExpense = (props) => {

    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: (Math.random() * 100000000).toString().substring(0, 8)
        }
        props.onAddExpenseData(expenseData);
    }

    return (<div className='new-expense'>
        <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>);
}


export default NewExpense;