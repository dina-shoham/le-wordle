import React, { useState, useEffect } from 'react';
import Guess from './components/Guess';
import GuessInput from './components/GuessInput';
import './styles.css';
import LetterTile from './components/LetterTile';

function App () {
  
  const [solution, setSolution] = useState("");
  const [currentGuess, setCurrentGuess] = useState({word: "", status: []});
  // statuses: -1 = not yet verified, 0 = incorrect, 1 = yellow, 2 = green
  const [guesses, setGuesses] = useState([]);
  const [guessNumber, setGuessNumber] = useState(-1);

  // call generate solution, empty array to ensure it only happens once
  // https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
  useEffect(() => {
    async function generateSolution() {
      try {
        let response = await fetch('https://trouve-mot.fr/api/size/6');
        response = await response.json();
        console.log("response:");
        console.log(response[0].name);
        setSolution(response[0].name);
      } catch (error) {
        console.error(error);
      }
    };
    generateSolution();
    setGuessNumber(0);
  }, []);

  // update guesses list when guess count is updated in child comp (guessInput)
  // useEffect(() => {
  //   setGuesses[guesses.concat(currentGuess)]
  // }, [guessNumber])

  function incrementGuessNumber() {
    setGuessNumber(guessNumber => guessNumber + 1);
  };

  // function checkIfRealWord(word) {
  //   // check word's validity
  // };

  return (
    <div>
      <h1>le wordle</h1>
      <GuessInput solution={solution} 
                  guessIncrementer={incrementGuessNumber}
                  currentGuessSetter={setCurrentGuess}/>
      <div>
        {/* <p>solution is: {solution}</p> */}
        <p>you are on guess #: {guessNumber}</p>
      </div>
    </div>
  );
}

export default App;
