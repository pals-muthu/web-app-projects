import { useContext } from 'react';
import ExpenseOutput from '../components/ExpenseOutput/ExpenseOutput';
import { Text } from 'react-native';
import { ExpensesContext } from '../components/Store/store';

function RecentExpenses({ navigation: { navigate } }) {
	const expensesCtx = useContext(ExpensesContext);
	console.log('recent expenses: ', expensesCtx.expenses);
	//filter out for the last seven days
	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const sevenDaysBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
		return expense.date > sevenDaysBefore;
	});
	return (
		<ExpenseOutput
			expensePeriod="7 Days"
			expenses={recentExpenses}
			navigate={navigate}
			fallbackText="No expenses registered for the last 7 days!"
		/>
	);
}

export default RecentExpenses;
