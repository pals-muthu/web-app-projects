import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../util/styles';
import Button from '../components/UI/Button';

function ManageExpense({ route, navigation }) {
	const expenseId = route?.params?.id;
	const isEditing = !!expenseId;
	if (expenseId) {
	} else {
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Manage Expense' : 'Add Expense',
		});
	}, []);

	const deleteExpenseHandler = () => {
		navigation.goBack();
	};

	const cancelHandler = () => {
		navigation.goBack();
	};

	const confirmHandler = () => {
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<View style={styles.buttons}>
				<Button mode="flat" onPress={cancelHandler} style={styles.button}>
					Cancel
				</Button>
				<Button onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
			</View>
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
				</View>
			)}
		</View>
	);
}

export default ManageExpense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: 'center',
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
});
