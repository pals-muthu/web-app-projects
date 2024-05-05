import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from '../../constants/colors';

const PrimaryButton = ({ children, onPress, style }) => {
  return (
    <View style={style ? [styles.outerContainer, style] : styles.outerContainer}>
      <Pressable style={({ pressed }) => pressed ? [styles.pressed, styles.container] : styles.container} onPress={onPress} android_ripple={{ color: Colors.primary600 }}>
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden'
  },
  container: {
    backgroundColor: Colors.primary500,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  }
})