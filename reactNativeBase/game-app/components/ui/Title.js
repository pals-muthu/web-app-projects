import { Text, StyleSheet, Platform } from "react-native";
import Colors from '../../constants/colors';

const Title = ({children}) => {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    // fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    // borderWidth: Platform.OS === "web" ? 0 : 2,
    borderWidth: Platform.select({web: 2, android: 0}),
    borderColor: Colors.accent500,
    padding: 12
  }
});