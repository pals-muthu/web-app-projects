import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList, ScrollView } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItems';

export default function App() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goalList, setGoalList] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  }

  const hideModal = () => {
    setIsModalVisible(false);
  }

  const addGoal = (goalText) => {
    setGoalList((prevState) => [...prevState, {text: goalText, id: Math.random().toString() }]);
  }

  const removeGoal = (id) => {
    console.log('calling remove goal: ', id);
    setGoalList(goalList.filter((goal => goal.id !== id)));
  }

  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.container}>
      <Button color="#5e0acc" onPress={showModal} title='Add Goal' />
      <GoalInput addGoal={addGoal} showModal={showModal} hideModal={hideModal} visible={isModalVisible} />
      <GoalItem goalList={goalList} removeGoal={removeGoal}/>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    // height: '100%',
    flex: 1,
    // borderWidth: 10,
    // borderColor: '#cccccc',
    backgroundColor: '#1e085a'
  }
});
