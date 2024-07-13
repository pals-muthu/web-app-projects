import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './util/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './components/Store/store';
import { Text } from 'react-native';

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
			screenOptions={({ navigation }) => ({
				headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				headerTintColor: 'white',
				tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				tabBarActiveTintColor: GlobalStyles.colors.accent500,
				headerRight: ({ tintColor }) => (
					<IconButton
						onPress={() => {
							navigation.navigate('ManageExpense');
						}}
						size={24}
						color={tintColor}
						icon="add"
					/>
				),
			})}
		>
			<BottomTabs.Screen
				name="RecentExpenses"
				component={RecentExpenses}
				options={{
					title: 'Recent Expenses',
					tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />,
				}}
			/>
			<BottomTabs.Screen
				name="AllExpenses"
				component={AllExpenses}
				options={{
					title: 'All Expenses',
					tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
				}}
			/>
		</BottomTabs.Navigator>
	);
};

export default function App() {
	return (
		<>
			<ExpensesContextProvider>
				<NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
					<Stack.Navigator
						screenOptions={{
							headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
							headerTintColor: 'white',
						}}
					>
						<Stack.Screen name="OverallExpenses" component={ExpensesOverview} options={{ headerShown: false }} />
						<Stack.Screen name="ManageExpense" component={ManageExpense} options={{ presentation: 'modal' }} />
					</Stack.Navigator>
				</NavigationContainer>
			</ExpensesContextProvider>
			<StatusBar style="light" />
		</>
	);
}
