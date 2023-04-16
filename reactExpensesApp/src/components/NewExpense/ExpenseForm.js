import React, {useState} from 'react';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    const [showControls, setShowControls] = useState('hide');

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    }

    const amountChangeHandler = (event) => {
        setEnteredAmount(parseFloat(event.target.value));
    }

    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    }

    // const [userInput, setUserInput] = useState({
    //     enteredTitle: '',
    //     enteredAmount: '',
    //     enteredDate: ''
    // })

    // const titleChangeHandler = (event) => {
    //     // setUserInput({
    //     //     ...userInput,
    //     //     enteredTitle : event.target.value,
    //     // });
    //     setUserInput((prevState) => {
    //         return {
    //             ...prevState,
    //             enteredTitle : event.target.value
    //         }
    //     })
    // }

    // const amountChangeHandler = (event) => {
    //     // setUserInput({
    //     //     ...userInput,
    //     //     enteredAmount : event.target.value
    //     // });
    //     setUserInput((prevState) => {
    //         return {
    //             ...prevState,
    //             enteredAmount : event.target.value
    //         }
    //     })
    // }

    // const dateChangeHandler = (event) => {
    //     // setUserInput({
    //     //     ...userInput,
    //     //     enteredDate : event.target.value
    //     // });
    //     setUserInput((prevState) => {
    //         return {
    //             ...prevState,
    //             enteredDate : event.target.value
    //         }
    //     })
    // }

    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate)
        }

        props.onSaveExpenseData(expenseData);

        setEnteredTitle('');
        setEnteredDate('');
        setEnteredTitle('');
        setShowControls('hide');

    }

    const hideHandler = () => {
        setShowControls('hide');
    }

    const showHandler = () => {
        setShowControls('show');
    }

    let addFormHtml = (<form onSubmit={submitHandler}>
        <div className='new-expense__controls'>
            <div className='new-expense__control'>
                <label>Title</label>
                <input type='text' value={enteredTitle} onChange={titleChangeHandler} />
            </div>
            <div className='new-expense__control'>
                <label>Amount</label>
                <input type='number' min='0.01' step='0.01' value={enteredAmount} onChange={amountChangeHandler} />
            </div>
            <div className='new-expense__control'>
                <label>Date</label>
                <input type='date' min='2019-01-01' step='2022-12-31' value={enteredDate} onChange={dateChangeHandler}/>
            </div>
        </div>
        <div className='new-expense__actions'>
            <button type='submit'>Add Expense</button>
            <button onClick={hideHandler}>Cancel</button>
        </div>
    </form>);

    if (showControls === 'hide') {
        addFormHtml = (<div className='new-expense__actions, center-text'>
                            <button onClick={showHandler}>Add New Expense</button>
                        </div>);
    }

    return addFormHtml;
}


export default ExpenseForm;