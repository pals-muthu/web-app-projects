import { FlatList, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native"
import { CATEGORIES, MEALS } from "../data/dummy-data"
import { useLayoutEffect } from "react";

const MealsOverviewScreen = ({ navigation, route }) => {
  const catId = route.params.id;

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((ct) => ct.id === catId).title;
    navigation.setOptions({
      title: categoryTitle
    });
  }, [catId, navigation]);
  
  const displayedMeals = MEALS.filter((mealItem) => {
    return (mealItem.categoryIds.indexOf(catId) >= 0);
  })

  const renderMealItem = (itemData) => {

    const pressHandler = () => {
      console.log('navigate: ', itemData.item.id);
      navigation.navigate('MealDetail', { id: itemData.item.id });
    }

    return (<View style={styles.mealItem}>
      <Pressable android_ripple={{ color: '#ccc' }} style={({ pressed }) =>
        [styles.button, pressed ? styles.buttonPressed : null]}
        onPress={pressHandler}
        >
        <View>
          <Image source={{ uri: itemData.item.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{itemData.item.title}</Text>
        </View>
        <View style={styles.details}>
          <Text>{itemData.item.duration}m</Text>
          <Text>{itemData.item.complexity.toUpperCase()}</Text>
          <Text>{itemData.item.affordability.toUpperCase()}</Text>
        </View>
      </Pressable>
    </View>);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  )
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  image: {
    width: '100%',
    height: Platform.OS === 'web' ? 1000 : 200
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    margin: 8
  },
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
  },
  button: {
    flex: 1
  },
  buttonPressed: {
    flex: 1,
    opacity: 0.5
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
})