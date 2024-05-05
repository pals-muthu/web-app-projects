import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native"
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from './../constants/colors';
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";


const StartGameScreen = ({ onConfirmNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState('');

  const { width, height } = useWindowDimensions();
  const marginTop = height < 380 ? 30 : 100;

  const numberInputHandler = (enteredText) => {
    console.log('entered: ', enteredText);
    setEnteredNumber(enteredText);
  }

  const resetInputHandler = () => {
    setEnteredNumber('');
  }

  const confirmInputHandler = () => {
    const chosenNumber = Number.parseInt(enteredNumber);
    console.log('chosenNumber: ', chosenNumber);
    if (Number.isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // show alert
      Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);

    } else {
      console.log('valid number');
      onConfirmNumber(chosenNumber);
    }
  }

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTop }]}>
          <Title>Guess My Number</Title>
          <Card>
            <View style={styles.inputContainer}>
              <Text style={styles.textContainer}>Enter a Number</Text>
              <TextInput
                style={styles.numberInput} maxLength={2}
                keyboardType={'number-pad'}
                autoCapitalize="none"
                autoCorrect={false}
                value={enteredNumber}
                // onChange={numberInputHandler}
                onChangeText={numberInputHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton style={styles.button} onPress={resetInputHandler}>Reset</PrimaryButton>
              <PrimaryButton style={styles.button} onPress={confirmInputHandler}>Confirm</PrimaryButton>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  rootContainer: {
    flex: 1,
    margin: 32,
    marginTop: 100
  },
  outerContainer: {
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4,
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2},
    // shadowRadius: 6,
    // shadowOpacity: 1
    flexDirection: 'column',
  },
  inputContainer: {
    alignItems: 'center'
  },
  textContainer: {
    color: Colors.accent500
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    flex: 1
  },
  numberInput: {
    height: 50,
    width: 75,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
