import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverview';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MealDetail from './screens/MealDetail';

const Stack = createStackNavigator();

const linking = {
  prefixes: [
    'http://localhost:19006'
  ],
  config: {
    screens: {
      MealsCategories: 'meal-categories',
      MealsOverview: 'meal-overview',
      MealDetail: 'meal-detail'
    }
  }
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Stack.Navigator screenOptions={{
          // headerShown: Platform.OS === 'web' ? false : true,
          headerStyle: { backgroundColor: '#351401' },
          headerTintColor: 'white',
          cardStyle: {
            backgroundColor: '#3f2f25'
          }
        }}>
          <Stack.Screen name="MealsCategories" component={CategoriesScreen} options={{
            title: 'Meals Categories'
          }} />
          <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} options={({ route, navigation }) => {
            const catId = route.params.id;
            return {
              title: catId
            }
          }} />
          <Stack.Screen name="MealDetail" component={MealDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24180F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
