import ExpenseOutput from '../components/ExpenseOutput/ExpenseOutput';
import { DUMMY_EXPENSES } from '../util/dummyData';

function RecentExpenses() {
	return <ExpenseOutput expensePeriod="7 Days" expenses={DUMMY_EXPENSES} />;
}

export default RecentExpenses;
