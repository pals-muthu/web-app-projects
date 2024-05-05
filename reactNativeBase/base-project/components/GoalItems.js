import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList, ScrollView, TouchableHighlight, Pressable } from 'react-native';

const GoalItem = (props) => {
  return (<View style={styles.goalsContainer}>
    {/* <ScrollView> {goalList.map((goal) => 
          <View style={styles.goalItem} key={goal}><Text style={styles.goalText}>{goal}</Text></View>
        )} </ScrollView> */}
    <FlatList data={props.goalList}
      renderItem={(itemData) => {
        return (
          <Pressable
            android_ripple={{ color: '#dddddd' }}
            onPress={props.removeGoal.bind(this, itemData.item.id)}
            style={({pressed}) => pressed && styles.pressedItem}
          >
            <View style={styles.goalItem}><Text style={styles.goalText}>{itemData.item.text}</Text></View>
          </Pressable>

        );
      }}
      keyExtractor={(item, index) => item.id}
    />
  </View>);
}

const styles = StyleSheet.create({
  goalsContainer: {
    flex: 4,
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#cccccc'
  },
  goalItem: {
    marginTop: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc'
  },
  pressedItem: {
    opacity: 0.5
  },
  goalText: {
    color: 'white'
  }
});


export default GoalItem;