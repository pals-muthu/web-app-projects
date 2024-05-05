import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import DiceImage from './assets/images/background.png';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {StatusBar} from "expo-status-bar"

export default function App() {

  const [enteredNum, setEnteredNum] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);
  const [numberOfRounds, setNumberOfRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  const changeEnteredNum = (num) => {
    setEnteredNum(num);
  }

  const startNewGame = (num) => {
    setEnteredNum(0);
    setGameIsOver(false);
    setNumberOfRounds(0);
  }

  const incrementNumberOfRounds = () => {
    setNumberOfRounds((prev) => prev + 1);
  }

  screen = <StartGameScreen onConfirmNumber={changeEnteredNum} />

  if (enteredNum) {
    screen = <GameScreen userNumber={enteredNum} setGameIsOver={setGameIsOver} incrementNumberOfRounds={incrementNumberOfRounds}/>;
  }

  if (gameIsOver) {
    screen = <GameOverScreen userNumber={enteredNum} numberOfRounds={numberOfRounds} startNewGame={startNewGame} />
  }

  return (
    <>
    <StatusBar style='light' />
    <LinearGradient colors={[Colors.accent500, Colors.primary700]} style={styles.rootScreen}>
      <ImageBackground source={DiceImage} resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.imageBackground}>
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    // backgroundColor: '#ddb52f'
  },
  imageBackground: {
    opacity: 0.15
  }
});
