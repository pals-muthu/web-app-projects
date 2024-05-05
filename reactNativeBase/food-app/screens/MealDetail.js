import { View, Text, Image, StyleSheet, Platform, ScrollView, Button } from "react-native";
import { MEALS } from "../data/dummy-data";
import { useLayoutEffect } from "react";

const MealDetail = ({ route, navigation }) => {

  const mealId = route.params.id;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="Tap Me!!!" />
      }
    })
  })

  return (<ScrollView style={styles.root}>
    <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
    <Text style={styles.title}>{selectedMeal.title}</Text>
    <View style={styles.details}>
      <Text style={[styles.detailItem, styles.detailText]}>{selectedMeal.duration}m</Text>
      <Text style={[styles.detailItem, styles.detailText]}>{selectedMeal.complexity.toUpperCase()}</Text>
      <Text style={[styles.detailItem, styles.detailText]}>{selectedMeal.affordability.toUpperCase()}</Text>
    </View>
    <View style={styles.listOuterContainer}>
      <View style={styles.listContainer}>
        <Text style={styles.subTitle}>Ingredients</Text>
        {selectedMeal.ingredients.map((ingredient) => <Text key={ingredient} style={[styles.listItem, styles.itemText]}>{ingredient}</Text>)}
        <Text style={styles.subTitle}>Steps</Text>
        {selectedMeal.steps.map((step) => <Text key={step} style={[styles.listItem, styles.itemText]}>{step}</Text>)}
      </View>
    </View>
  </ScrollView>)

};

export default MealDetail;

const styles = StyleSheet.create({
  root: {
    marginBottom: 24
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12
  },
  image: {
    width: '100%',
    height: Platform.OS === 'android' ? 350 : 550
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white'
  },
  detailText: {
    color: 'white'
  },
  subTitle: {
    color: '#e2b497',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    marginHorizontal: 24,
    padding: 6,
    borderBottomColor: '#e2b497',
    borderBottomWidth: 2,
    textAlign: 'center'
  },
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: '#e2b497',
  },
  itemText: {
    color: '#351401',
    textAlign: 'center'
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  }
})
