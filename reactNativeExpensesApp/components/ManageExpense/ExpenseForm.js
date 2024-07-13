import { View, Text, StyleSheet } from 'react-native';
import Input from './Input';

const ExpenseForm = ({}) => {
	const amountChangedHandler = () => {};

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.rowContainer}>
				<Input
					label="Amount"
					textInputConfig={{
						keyboardType: 'decimal-pad',
						onChangeText: amountChangedHandler,
					}}
					style={styles.rowInput}
				/>
				<Input
					label="Date"
					textInputConfig={{
						placeholder: 'YYYY-MM-DD',
						maxLength: 10,
						onChangeText: () => {},
					}}
					style={styles.rowInput}
				/>
			</View>
			<Input
				label="Description"
				textInputConfig={{
					multiline: true,
				}}
			/>
		</View>
	);
};

export default ExpenseForm;

const styles = StyleSheet.create({
	form: {
		marginTop: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
		marginVertical: 24,
		textAlign: 'center',
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	rowInput: { flex: 1 },
});
