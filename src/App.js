import React, { useState, useEffect } from 'react';
import Guess from './components/Guess';
import GuessInput from './components/GuessInput';
import './App.css';

function App () {
  
  const [solution, setSolution] = useState("");
  // const [currentGuess, setCurrentGuess] = useState({word: "", status: []});
  // statuses: -1 = not yet verified, 0 = incorrect, 1 = yellow, 2 = green
  const [guesses, setGuesses] = useState(Array(7));
  const [guessNumber, setGuessNumber] = useState(-1);

  // call generate solution, empty array to ensure it only happens once
  // https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
  useEffect(() => {
    async function generateSolution() {
      try {
        let response = await fetch('https://trouve-mot.fr/api/size/6');
        response = await response.json();
        console.log("response:");
        console.log(response);
        setSolution(response[0].name);
      } catch (error) {
        console.error(error);
      }
    };
    generateSolution();
    setGuessNumber(0);
  }, []);

  // update guesses list
  function updateGuessList(guess) {
    let guessesTmp = [...guesses];
    guessesTmp[guessNumber] = guess;
    setGuesses(guessesTmp);
    console.log(guesses);
  };

  // useEffect(() => {
  //   if (guessNumber > 0) {
  //     let guessesTmp = [...guesses];
  //     guessesTmp[guessNumber - 1] = currentGuess;
  //     setGuesses(guessesTmp);
      
  //     console.log("updated guesses");
  //     console.log(guesses);
  //   }
  // }, [guessNumber])

  function incrementGuessNumber() {
    setGuessNumber(guessNumber => guessNumber + 1);
  };

  return (
    <div>
      <h1>bienvenue au wordle</h1>
      <GuessInput solution={solution} 
                  guessIncrementer={incrementGuessNumber}
                  // currentGuessSetter={setCurrentGuess}
                  guessListUpdater={updateGuessList}/>
      <div>
      {/* <Guess word='tester'/> */}
      </div>
      <div>
        <p>solution is: {solution}</p>
        <p>you are on guess #: {guessNumber}</p>
      </div>
    </div>
  );
}

export default App;
