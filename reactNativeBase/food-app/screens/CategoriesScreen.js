import { FlatList, Platform, Text } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen = ({ navigation: { navigate } }) => {
  const pressHandler = (id, evt) => {
    navigate('MealsOverview', { id });
  };

  return (
    <FlatList data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={(listItem) => (<CategoryGridTile title={listItem.item.title} color={listItem.item.color}
        onPress={pressHandler.bind(this, listItem.item.id)} />)}
      numColumns={Platform.OS === 'web' ? 4 : 2}
    />);
}

export default CategoriesScreen;