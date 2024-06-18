import ExpenseOutput from '../components/ExpenseOutput/ExpenseOutput';
import { DUMMY_EXPENSES } from '../util/dummyData';

function AllExpenses() {
	return <ExpenseOutput expensePeriod="All" expenses={DUMMY_EXPENSES} />;
}

export default AllExpenses;
