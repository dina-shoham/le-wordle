import React, { useState, useEffect } from 'react';
import Guess from './components/Guess';
import GuessInput from './components/GuessInput';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import './styles.css';

function App () {
  // var currentGuess = "";
  var guessIndex = -1;
  var emptyStatusArr = [-1, -1, -1, -1, -1, -1];
  
  const [solution, setSolution] = useState("");
  const [guessNumber, setGuessNumber] = useState(-1);
  // const [guessIndex, setGuessIndex] = useState(-1);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessingDisabled, setGuessingDisabled] = useState(false);
  // statuses: -1 = not yet verified, 0 = incorrect, 1 = yellow, 2 = green
  const [guesses, setGuesses] = useState([{word: "      ", status: emptyStatusArr},
                                           {word: "      ", status: emptyStatusArr},
                                           {word: "      ", status: emptyStatusArr},
                                           {word: "      ", status: emptyStatusArr},
                                           {word: "      ", status: emptyStatusArr},
                                           {word: "      ", status: emptyStatusArr},
                                           {word: "      ", status: emptyStatusArr}                                           
                                         ]);

  // call generate solution, empty array to ensure it only happens once
  // https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
  useEffect(() => {
    async function generateSolution() {
      try {
        let response = await fetch('https://trouve-mot.fr/api/size/6');
        response = await response.json();
        setSolution(response[0].name);
      } catch (error) {
        console.error(error);
      }
    };
    generateSolution();
    setGuessNumber(1);
  }, []);

  // keyboard listener for typing in guesses
  useEffect(() => {
    const keyDownHandler = event => {
      if (guessIndex < 5) {
        // ensure key is in alphabet (qwerty: 65-90)
        if (event.keyCode >= 65 && event.keyCode <= 90) {
          console.log("letter typed");
          updateCurrentGuess(event.key);
        }
        // todo: handle azerty keyboard accent keys
        // azerty: 65-90 and 50, 55, 57, 48, 192, 229
      }
    }
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [])
  
  // update current guess
  function updateCurrentGuess(char) {
    incrementGuessIndex();
    setCurrentGuess(currentGuess => currentGuess.substring(0, guessIndex) + char + currentGuess.substring(guessIndex + 1));
  };
  
  // render current guess on grid
  useEffect(() => {
    console.log("here");
    var guessPadded = currentGuess;
    // pad guess with spaces
    while(guessPadded.length < 6) {
      guessPadded = guessPadded.concat(" ");
    }

    // add to guesses array
    let guessesTmp = [...guesses];
    guessesTmp[guessNumber - 1] = {word: guessPadded, status: emptyStatusArr};
    setGuesses(() => guessesTmp);
  }, [currentGuess])
  
  // update guesses list
  function updateGuessList(guess) {
    setGuesses([
      ...guesses, guess
    ]);
  };
  
  // self explanatory i hope
  function incrementGuessIndex() {
    guessIndex = guessIndex + 1;
    // setGuessIndex(guessIndex => guessIndex + 1);
    console.log("incr");
  };
  
  // self explanatory i hope
  function incrementGuessNumber() {
    setGuessNumber(guessNumber => guessNumber + 1);
  };

  // lose after 7 guesses
  useEffect(() => {
    if (guessNumber > 7) {
      // show "you lost" message
      Toastify({
        text: `Tu as perdu! La réponse était: ${solution}`,
        duration: -1,
        position: 'center',
        offset: {
          y: 50
        },
        style: {
          background: "#000",
          color: "#fff",
        },
      }).showToast(); 

      // disable input
      setGuessingDisabled(true);
    }
  }, [guessNumber]);
  
  // winning
  function equals2(element) {
    return element == 2;
  }

  useEffect(() => {
    let hasWon = false;
    if (guessNumber > 1) {
      let mostRecentGuessStatus = guesses[guesses.length - 1].status;
      hasWon = mostRecentGuessStatus.every(equals2);
    }
    if (hasWon) {
      // show "you won" message
      Toastify({
        text: `Tu as gagné!`,
        duration: -1,
        position: 'center',
        offset: {
          y: 50
        },
        style: {
          background: "#000",
          color: "#fff",
        },
      }).showToast(); 

      // disable input
      setGuessingDisabled(true);
    }
  }, [guesses]);

  return (
    <div>
      <h1>le wordle</h1>
      <GuessInput solution={solution} 
                  guessIncrementer={incrementGuessNumber}
                  guessListUpdater={updateGuessList}
                  disabled={guessingDisabled}/>
      <div>
        <p>you are on guess #: {guessNumber}</p>
          {guesses.map((guess, index) => (
            <Guess word={guess.word}
                   statusArr={guess.status}
                   key={index}/>
          ))}
      </div>
    </div>
  );
}

export default App;
