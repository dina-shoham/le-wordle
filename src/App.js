import React, { useState, useEffect } from 'react';
import Guess from './components/Guess';
import GuessInput from './components/GuessInput';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import './styles.css';
import { WORDS } from './dictionary/words'

function App () {
  /*=================================================================
    VARIABLES
  =================================================================*/
  // var currentGuess = "";
  const emptyStatusArr = [-1, -1, -1, -1, -1, -1];
  let guessIndex = -1;
  let isValidGuess = true;
  
  const [solution, setSolution] = useState("");
  const [guessNumber, setGuessNumber] = useState(-1);
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentGuessIndex, setCurrentGuessIndex] = useState(-1);
  // const [guessingDisabled, setGuessingDisabled] = useState(false);
  const [guesses, setGuesses] = useState([{word: "      ", status: emptyStatusArr},
                                          {word: "      ", status: emptyStatusArr},
                                          {word: "      ", status: emptyStatusArr},
                                          {word: "      ", status: emptyStatusArr},
                                          {word: "      ", status: emptyStatusArr},
                                          {word: "      ", status: emptyStatusArr},
                                          {word: "      ", status: emptyStatusArr}                                           
  ]);
  // statuses: -1 = not yet verified, 0 = incorrect, 1 = yellow, 2 = green
  
  /*=================================================================
    SETUP
  =================================================================*/
  // call generate solution, empty array to ensure it only happens once
  // https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
  useEffect(() => {
    async function generateSolution() {
      let lineNum = Math.floor((Math.random() * WORDS.length)); 
      setSolution(WORDS[lineNum]);
      console.log("solution: " + WORDS[lineNum]);
    };
    generateSolution();
    setGuessNumber(1);
  }, []);

  /*=================================================================
    TYPING GUESS
  =================================================================*/
  // keyboard listener for typing in guesses
  useEffect(() => {
    const keyDownHandler = event => {
      if (currentGuessIndex < 5 || !isValidGuess) {
        // ensure key is in alphabet (qwerty: 65-90)
        if (event.keyCode >= 65 && event.keyCode <= 90) {
          updateCurrentGuess(event.key);
        }

        // backspace
        if (event.keyCode == 8) {
          handleBackspace();
        }
      } 
      
      if (currentGuessIndex == 5) {
        // enter
        if (event.keyCode == 13) {
          verifyGuess(currentGuess);
        }
      }
    }
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [currentGuess, currentGuessIndex]);
  
  // typing helpers: 
  // update current guess
  function updateCurrentGuess(char) {
    setCurrentGuessIndex(currentGuessIndex => currentGuessIndex + 1);
    setCurrentGuess(currentGuess => currentGuess + char);
  };
  
  // handle backspace event
  function handleBackspace() {
    // prevent from decementing past -1
    if (currentGuessIndex > -1) {
      setCurrentGuessIndex(currentGuessIndex => currentGuessIndex - 1);
    }
    setCurrentGuess(currentGuess => currentGuess.substring(0, currentGuess.length - 1));
  };

  // render current guess in the boxes on the screen (only guesses array renders)
  useEffect(() => {
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
  
  /*=================================================================
    SUBMITTING GUESS
  =================================================================*/
  // self explanatory i hope
  function incrementGuessNumber() {
    setGuessNumber(guessNumber => guessNumber + 1);
  };

  // verify guess
  function verifyGuess(guess) {
    // check if guess is in list
    if (!WORDS.includes(guess)) {
      isValidGuess = false;
      console.log("word not in list!");
      Toastify({
        text: `Word not in list!`,
        duration: 2000,
        position: 'center',
        offset: {
          y: 50
        },
        style: {
          background: "#000",
          color: "#fff",
        },
      }).showToast(); 
    }

    if (isValidGuess && guess.length === 6) {
      let verifArray = emptyStatusArr;

      // verify word against solution
      for (let i = 0; i < guess.length; i++) {
        // green
        if (solution[i] === guess[i]) {
          verifArray[i] = 2; // green
          continue;
        // yellow
        } else if (solution.includes(guess[i])) {
          verifArray[i] = 1; // yellow
        } else {
            verifArray[i] = 0; // grey
        }
        // todo: duplicate letter handling
      }

      console.log("guess " + guess + ", status: " + verifArray);
      
      // add guess to guesses array, increment guess count
      let guessesTmp = [...guesses];
      guessesTmp[guessNumber - 1] = {word: guess, status: verifArray};
      setGuesses(() => guessesTmp);
      incrementGuessNumber();

      // reset current guess state vars
      setCurrentGuessIndex(-1);
      setCurrentGuess("");
    }
  };

  /*=================================================================
    GAME FUNCTIONS (winning, losing)
  =================================================================*/
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
      // setGuessingDisabled(true);
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
      // setGuessingDisabled(true);
    }
  }, [guesses]);

  /*=================================================================
    RENDER
  =================================================================*/
  return (
    <div>
      <h1>le wordle</h1>
      {/* <GuessInput solution={solution} 
                  guessIncrementer={incrementGuessNumber}
                  guessListUpdater={updateGuessList}
                  disabled={guessingDisabled}/> */}
      <div>
        <p>you are on guess #: {guessNumber}</p>
          {guesses.map((guess, index) => (
            <Guess word={guess.word}
                   statusArr={guess.status}
                   key={index}/>
          ))}
      </div>
      <div>
        <p>current guess is: {currentGuess}</p>
        <p>current guess index is: {currentGuessIndex}</p>
      </div>
    </div>
  );
}

export default App;
