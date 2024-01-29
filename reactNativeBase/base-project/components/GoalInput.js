import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList, ScrollView, Modal, Image } from 'react-native';
import goalIcon from '../assets/images/goal.png';

const GoalInput = (props) => {

  const [goalText, setGoalText] = useState('');

  const changeGoalText = (enteredText) => {
    setGoalText(enteredText);
  }

  const addGoalHandler = () => {
    props.addGoal(goalText);
    setGoalText('');
    props.hideModal();
  }

  return (
    <Modal visible={props.visible} animationType="slide" onDismiss={props.hideModal} onRequestClose={props.hideModal}>
      <View style={styles.inputContainer}>
        <Image source={goalIcon} style={styles.image} />
        <TextInput style={styles.textInput} placeholder='Enter goals...' onChangeText={changeGoalText} value={goalText} />
        {/* <Button title='Add Goal' onPress={props.addGoal.bind(this, goalText)} /> */}
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
          <Button title='Add Goal' onPress={addGoalHandler} color="#5e0acc"/>
          </View>
          <View style={styles.button}>
          <Button title='Cancel' onPress={props.hideModal} color="#f31282"/>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#311b6b'
  },
  image: {
    width: 100,
    height: 100,
    margin: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%'
  },
  button: {
    width: '40%',
  },
  textInput: {
    width: '70%',
    padding: 8,
    margin: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    color: 'white'
  }
});


export default GoalInput;