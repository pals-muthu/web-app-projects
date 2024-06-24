import { createContext, useReducer } from 'react';

export const DUMMY_EXPENSES = [
	{
		id: 'e1',
		description: 'A pair of shoes',
		amount: 59.99,
		date: new Date('2023-12-19'),
	},
	{
		id: 'e2',
		description: 'A pair of trousers',
		amount: 89.29,
		date: new Date('2024-01-05'),
	},
	{
		id: 'e3',
		description: 'Some bananas',
		amount: 5.99,
		date: new Date('2024-06-21'),
	},
	{
		id: 'e4',
		description: 'A book',
		amount: 14.99,
		date: new Date('2024-06-23'),
	},
	{
		id: 'e5',
		description: 'Another book',
		amount: 18.59,
		date: new Date('2024-02-18'),
	},
];

export const ExpensesContext = createContext({
	expenses: [],
	addExpense: ({ description, amount, date }) => {},
	updateExpense: (id, { description, amount, date }) => {},
	deleteExpense: (id) => {},
});

const expensesReducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			return [{ ...action.payload, id: Math.random().toString() }, ...state];
		case 'DELETE':
			return state.filter((expense) => expense.id !== action.payload);
		case 'UPDATE':
			const updateExpenseId = state.findIndex((expense) => expense.id === action.payload.id);
			const expenseData = { ...state[updateExpenseId], ...action.payload.data };
			state[updateExpenseId] = expenseData;
			return [...state];
		default:
			return [...state];
	}
};

const ExpensesContextProvider = ({ children }) => {
	const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

	const addExpense = (expenseData) => {
		dispatch({ type: 'ADD', payload: expenseData });
	};

	const updateExpense = (id) => {
		dispatch({ type: 'UPDATE', payload: id });
	};

	const deleteExpense = (id, expenseData) => {
		dispatch({ type: 'DELETE', payload: { id, data: expenseData } });
	};

	const value = {
		expenses: expensesState,
		addExpense,
		updateExpense,
		deleteExpense,
	};

	return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
};

export default ExpensesContextProvider;
