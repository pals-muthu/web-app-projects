import { useContext } from 'react';
import MealsList from '../components/MealsList/MealsList';
import { FavouritesContext } from '../store/context/favourites-context';
import { MEALS } from '../data/dummy-data';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

function FavoritesScreen() {
  // const favouriteMealsCtx = useContext(FavouritesContext);
  // const favouriteMeals = MEALS.filter((meal) => favouriteMealsCtx.ids.includes(meal.id));
  const favouriteMealIds = useSelector((state) => state.favouriteMeals.ids);
  const favouriteMeals = MEALS.filter((meal) => favouriteMealIds.includes(meal.id));

  if (!favouriteMeals.length) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favourite meals yet.</Text>
      </View>
    )
  }

  return <MealsList items={favouriteMeals} />
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
})
