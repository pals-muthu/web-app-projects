import { useContext } from 'react';
import ExpenseOutput from '../components/ExpenseOutput/ExpenseOutput';
import { ExpensesContext } from '../components/Store/store';

function AllExpenses({ navigation: { navigate } }) {
	const expensesCtx = useContext(ExpensesContext);
	return (
		<ExpenseOutput
			expensePeriod="All"
			expenses={expensesCtx.expenses}
			navigate={navigate}
			fallbackText="No expenses registered"
		/>
	);
}

export default AllExpenses;
