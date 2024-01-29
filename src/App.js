import React, { useState, useEffect } from 'react';
import Guess from './components/Guess';
import GuessInput from './components/GuessInput';
import './styles.css';
import LetterTile from './components/LetterTile';

function App () {
  
  const [solution, setSolution] = useState("");
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
    setGuessNumber(1);
  }, []);

  // update guesses list
  function updateGuessList(guess) {
    setGuesses([
      ...guesses, guess
    ]);
  };

  function incrementGuessNumber() {
    setGuessNumber(guessNumber => guessNumber + 1);
  };

  // lose after 7 guesses
  useEffect(() => {
    console.log("guess number changed");
    console.log(guessNumber);
    if(guessNumber == 7) {
      console.log("you have lost");
    }
  }, [guessNumber])

  return (
    <div>
      <h1>le wordle</h1>
      <GuessInput solution={solution} 
                  guessIncrementer={incrementGuessNumber}
                  guessListUpdater={updateGuessList}/>
      <div>
        {/* <p>solution is: {solution}</p> */}
        <p>you are on guess #: {guessNumber}</p>
        <p>you have guessed these words:</p>
        <ul>
          {guesses.map(guess => (
            <Guess word={guess.word}/>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
