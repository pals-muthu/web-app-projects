import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

const linking = {
	prefixes: ['http://localhost:8081'],
	config: {
		screens: {
			OverallExpenses: '',
			RecentExpenses: 'recent-expenses',
			AllExpenses: 'all-expenses',
			ManageExpense: 'manage-expense',
		},
	},
};

const ExpensesOverview = () => {
	return (
		<BottomTabs.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				headerTintColor: 'white',
				tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				tabBarActiveTintColor: GlobalStyles.colors.accent500,
			}}
		>
			<BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{ title: 'Recent Expenses' }} />
			<BottomTabs.Screen name="AllExpenses" component={AllExpenses} options={{ title: 'All Expenses' }} />
		</BottomTabs.Navigator>
	);
};

export default function App() {
	return (
		<>
			<NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
				<Stack.Navigator>
					<Stack.Screen name="OverallExpenses" component={ExpensesOverview} options={{ headerShown: false }} />
					<Stack.Screen name="ManageExpense" component={ManageExpense} options={{ title: 'Manage Expense' }} />
				</Stack.Navigator>
			</NavigationContainer>
			<StatusBar style="auto" />
		</>
	);
}
