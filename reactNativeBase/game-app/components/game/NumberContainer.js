import { StyleSheet, View, Text, Dimensions } from "react-native";
import Colors from "../../constants/colors";

const NumberContainer = ({children}) => {

  // console.log('1getting the dimensions: ', Dimensions.get('window'));

  // Dimensions.addEventListener("change", ({window, screen}) => {
  //   console.log('1altered the dimensions: ', window);
  // })

  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  )
};

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding:  deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numberText: {
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 28 : 36,
    fontWeight: 'bold'
  }
})