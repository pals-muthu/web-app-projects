import React, {useState} from 'react';

import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import './Expenses.css';
import ExpensesFilter from './ExpensesFilter';

const Expenses = (props) => {

  const [selectedYear, setSelectedYear] = useState('2020');

  const setSelectedYearHandler = (selectedYear) => {
    setSelectedYear(selectedYear);
  }

  return (
    <div className="expenses">
      <ExpensesFilter selectedYear={selectedYear} onYearSet={setSelectedYearHandler}/>
      <Card>
        {props.items.map(eachExpense => (<ExpenseItem
          title={eachExpense.title}
          amount={eachExpense.amount}
          date={eachExpense.date}
        />))
        }
      </Card>
    </div>
  );
}

export default Expenses;
