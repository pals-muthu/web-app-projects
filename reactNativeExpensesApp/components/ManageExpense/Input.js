import { Text, TextInput, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../util/styles';

const Input = ({ label, style, textInputConfig }) => {
	return (
		<View style={[styles.inputContainer, style]}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={[styles.input, textInputConfig?.multiline ? styles.inputMultiline : null]}
				{...textInputConfig}
			/>
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	inputContainer: {
		marginHorizontal: 4,
		marginVertical: 8,
	},
	label: {
		color: GlobalStyles.colors.primary100,
		marginBottom: 4,
		fontSize: 12,
	},
	input: {
		backgroundColor: GlobalStyles.colors.primary100,
		color: GlobalStyles.colors.primary700,
		padding: 6,
		borderRadius: 6,
		fontSize: 18,
	},
	inputMultiline: {
		minHeight: 100,
		textAlignVertical: 'top',
	},
});
