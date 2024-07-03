import { FlatList, View, Text, StyleSheet, Pressable } from 'react-native';
import { GlobalStyles } from '../../util/styles';
import { getFormattedDate } from '../../util/date';

const expenseItem = (navigate, expenseItem) => {
	const onItemPress = (id, evt) => {
		navigate('ManageExpense', { id });
	};

	return (
		<Pressable style={({ pressed }) => pressed && styles.pressed} onPress={onItemPress.bind(this, expenseItem.item.id)}>
			<View style={styles.cardItem}>
				<View>
					<Text style={[styles.textBase, styles.description]}>{expenseItem.item.description}</Text>
					<Text style={styles.textBase}>{getFormattedDate(expenseItem.item.date)}</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text style={[styles.amount]}>${expenseItem.item.amount.toFixed(2)}</Text>
				</View>
			</View>
		</Pressable>
	);
};

const ExpenseOutput = ({ expenses, expensePeriod, navigate, fallbackText }) => {
	const sum = expenses.reduce((sum, expense) => {
		return sum + expense.amount;
	}, 0);

	let content = <Text style={styles.infoText}>{fallbackText}</Text>;
	if (expenses.length) {
		content = (
			<FlatList data={expenses} keyExtractor={(item) => item.id} renderItem={expenseItem.bind(this, navigate)} />
		);
	}
	return (
		<View style={styles.outerContainer}>
			<View style={styles.summaryContainer}>
				<Text style={styles.period}>Period: {expensePeriod}</Text>
				<Text style={styles.total}>Total: {sum.toFixed(2)}</Text>
			</View>
			{content}
		</View>
	);
};

export default ExpenseOutput;

const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary700,
	},
	summaryContainer: {
		backgroundColor: GlobalStyles.colors.primary50,
		padding: 8,
		borderRadius: 6,
		marginBottom: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	period: {
		fontSize: 14,
		padding: 4,
		color: GlobalStyles.colors.primary400,
	},
	total: {
		fontSize: 18,
		padding: 4,
		color: GlobalStyles.colors.primary500,
	},
	cardItem: {
		backgroundColor: GlobalStyles.colors.primary500,
		padding: 8,
		borderRadius: 6,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 8,
		elevation: 3,
		shadowColor: GlobalStyles.colors.gray500,
		shadowRadius: 4,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
	},
	pressed: {
		opacity: 0.75,
	},
	textBase: {
		color: GlobalStyles.colors.primary50,
	},
	description: {
		fontSize: 16,
		marginBottom: 4,
		fontWeight: 'bold',
	},
	amountContainer: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		minWidth: 80,
	},
	amount: {
		color: GlobalStyles.colors.primary500,
		fontWeight: 'bold',
	},
	infoText: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
		marginTop: 32,
	},
});
