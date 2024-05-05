import { Alert, FlatList, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import Colors from "../constants/colors";
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, setGameIsOver, incrementNumberOfRounds }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [gameRounds, setGameRounds] = useState([]);
  const { width, height } = useWindowDimensions();

  function nextGuessHandler(direction) {
    if ((direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'higher' && currentGuess > userNumber)
    ) {
      Alert.alert('Sorry!!!', 'You know this is wrong', [{ text: 'Sorry!', style: 'cancel' }]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber);
    incrementNumberOfRounds();
    setGameRounds((prevRounds) => [newRndNumber, ...prevRounds]);
  }

  useEffect(() => {
    if (currentGuess === userNumber) {
      setGameIsOver(true);
    }
  }, [currentGuess, userNumber, setGameIsOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);


  let content = <>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card>
      <Text style={styles.textContainer}>Higher or Lower ?</Text>
      <View style={styles.buttonsContainer}>
        <PrimaryButton style={styles.buttonContainer} onPress={nextGuessHandler.bind(this, 'higher')}>
          <Ionicons name="md-add" size={24} color="white" />
        </PrimaryButton>
        <PrimaryButton style={styles.buttonContainer} onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </PrimaryButton>
      </View>
    </Card>
  </>;

  console.log('width: ', width);

  if (width > 500) {
    content = <>
      <View style={styles.buttonsContainerWide}>
        <PrimaryButton style={styles.buttonContainer} onPress={nextGuessHandler.bind(this, 'higher')}>
          <Ionicons name="md-add" size={24} color="white" />
        </PrimaryButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <PrimaryButton style={styles.buttonContainer} onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </PrimaryButton>
      </View>
    </>
  }

  return (<View style={styles.screen}>
    <Title>Opponent's Guess</Title>
    {content}
    <View style={styles.listContainer}>
      <FlatList data={gameRounds}
        renderItem={(itemData) => {
          return (<View>
            <GuessLogItem roundNumber={gameRounds.length - itemData.index} guess={itemData.item} />
          </View>)
        }}
        keyExtractor={(item, index) => item}
      />
    </View>
  </View>)
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    margin: 24
  },
  textContainer: {
    color: Colors.accent500,
    justifyContent: 'center',
    display: 'flex'
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    padding: 24
  }
})