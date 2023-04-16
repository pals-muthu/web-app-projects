import React from 'react';
import './ExpensesList.css';
import ExpenseItem from './ExpenseItem';

const ExpensesList = (props) => {

  let expensesContent = <h2 className='expenses-list__fallback' >No items found</h2>;
  if (props.filteredExpenses.length) {
    expensesContent = <ul className='expenses-list'>
      {props.filteredExpenses.map(eachExpense => (<ExpenseItem
      key={eachExpense.id}
      title={eachExpense.title}
      amount={eachExpense.amount}
      date={eachExpense.date}
    />))}</ul>
  }

  return (
    expensesContent
  );

}

export default ExpensesList;