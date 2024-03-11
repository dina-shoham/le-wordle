import React, { useState, useEffect } from 'react';
import Guess from './components/Guess';
import Keyboard from './components/Keyboard';
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
  let isValidGuess = true;
  
  // keep track of keyboard letter status
  // indexed based on azerty keyboard: arr[0] represents a, arr[1] represents z, etc.
  // so order is: azertyuiopqsdfghjklmwxcvbn
  const [keyStatusArray, setKeyStatusArray] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
                                               -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
                                               -1, -1, -1, -1, -1, -1]);
  
  const [solution, setSolution] = useState("");
  const [guessNumber, setGuessNumber] = useState(-1);
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentGuessIndex, setCurrentGuessIndex] = useState(-1);
  const [guessingDisabled, setGuessingDisabled] = useState(false);
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
  useEffect(() => {
    function generateSolution() {
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
      if (!guessingDisabled) {  
        if (currentGuessIndex <= 5 || !isValidGuess) {
          // ensure key is in alphabet (qwerty: 65-90)
          if (currentGuessIndex < 5 && event.keyCode >= 65 && event.keyCode <= 90) {
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
    }
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [currentGuess, currentGuessIndex, guessingDisabled]);
  
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
    if (guessNumber <= 7) {
      var guessPadded = currentGuess;
      // pad guess with spaces
      while(guessPadded.length < 6) {
        guessPadded = guessPadded.concat(" ");
      }
  
      // add to guesses array
      let guessesTmp = [...guesses];
      guessesTmp[guessNumber - 1] = {word: guessPadded, status: emptyStatusArr};
      setGuesses(() => guessesTmp);
    }
  }, [currentGuess, guessNumber])
  
  /*=================================================================
    SUBMITTING GUESS
  =================================================================*/
  // verify guess
  function verifyGuess(guess) {
    // check if guess is in list
    if (!WORDS.includes(guess)) {
      isValidGuess = false;
      console.log("Pas un mot!");
      Toastify({
        text: `Pas un mot!`,
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
          // // backtrack, check if we set any yellows for the same letter
          for (let j = 0; j < guess.length; j++) {
            if (j === i) continue;
            if (guess[j] === guess[i] && verifArray[j] === 1 && countCharacterOccurrences(solution, guess[i]) === 1) {
              verifArray[j] = 0;
            }
          }
          continue;
        // yellow
        } else if (solution.includes(guess[i])) {
          verifArray[i] = 1; // yellow
          // duplicate yellow handling: 
          // if there is already a yellow for the same letter (and the letter only occurs once), make it grey
          for (let k = 0; k < guess.length; k++) {
            if (k === i) continue;
            if (verifArray[k] === 1 && guess[k] === guess[i] && countCharacterOccurrences(solution, guess[k]) === 1) {
              verifArray[i] = 0; // grey
              continue;
            }
          }
        } else {
            verifArray[i] = 0; // grey
        }

        // run thru verifArray and set keyStatusArray accordingly
        let keyStatusArrayTmp = [...keyStatusArray];
        for (let i = 0; i < verifArray.length; i++) {
          if (verifArray[i] !== -1) {
            let charIndex = getCharacterIndex(guess[i]); // get keyboard index associated w current char
            if (verifArray[i] > keyStatusArrayTmp[charIndex]) { // only update key status from grey -> yellow -> green (can't backtrack green to grey)
              keyStatusArrayTmp[charIndex] = verifArray[i];
            }
          }
        } 
        setKeyStatusArray(() => keyStatusArrayTmp);
      }

      // add guess to guesses array, increment guess count
      let guessesTmp = [...guesses];
      guessesTmp[guessNumber - 1] = {word: guess, status: verifArray};
      setGuesses(() => guessesTmp);
      
      setGuessNumber(guessNumber => guessNumber + 1);

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
      // disable input
      setGuessingDisabled(true);

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
    }
  }, [guessNumber]);
  
  // winning
  useEffect(() => {
    let hasWon = false;

    if (guessNumber > 1) {
      let mostRecentGuessStatus = guesses[guessNumber - 2].status; // - 2 because -1 for index, -1 because we increment guess number after hitting enter
      hasWon = mostRecentGuessStatus.every(equals2);
    }
    
    if (hasWon) {
      // disable input
      setGuessingDisabled(true);
      
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
    }
  }, [guessNumber]);

  /*=================================================================
    HELPER FUNCTIONS
  =================================================================*/
  // returns index in keyboard array for a given character
  function getCharacterIndex(char) {
    let charArray = ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 
                     'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 
                     'w', 'x', 'c', 'v', 'b', 'n'];
    for (let i = 0; i < charArray.length; i++) {
      if (charArray[i] === char) return i;
    }
  }
  
  function countCharacterOccurrences(word, char) {
    let count = 0; 
    for (let i = 0; i < word.length; i++) {
      if (word[i] === char) {
        count++;
      }
    }
    return count;
  }

  function equals2(element) {
    return element == 2;
  }
  
  /*=================================================================
    RENDER
  =================================================================*/
  return (
    <div className='container'>
      <div>
        <h1>Le Wordle</h1>
      </div>
      <div>
          {guesses.map((guess, index) => (
            <Guess word={guess.word}
                   statusArr={guess.status}
                   key={index}/>
          ))}
      </div>
      <div><p> </p></div> 
      <div>
        <Keyboard keyStatusArray={keyStatusArray}/>
      </div>
    </div>
  );
}

export default App;
