import React, { useState, useEffect } from 'react';
import Guess from './components/Guess';
import GuessInput from './components/GuessInput';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import './styles.css';

function App () {
  /*=================================================================
    VARIABLES
  =================================================================*/
  // var currentGuess = "";
  const emptyStatusArr = [-1, -1, -1, -1, -1, -1];
  let guessIndex = -1;
  let isFrenchWord = true;
  
  const [solution, setSolution] = useState("");
  const [guessNumber, setGuessNumber] = useState(-1);
  const [currentGuess, setCurrentGuess] = useState("");
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
  
  // just for testing
  const [displayGuess, setDisplayGuess] = useState(false);

  /*=================================================================
    SETUP
  =================================================================*/
  // call generate solution, empty array to ensure it only happens once
  // https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
  useEffect(() => {
    async function generateSolution() {
      try {
        let response = await fetch('https://trouve-mot.fr/api/size/6');
        response = await response.json();
        setSolution(response[0].name);
        console.log((response[0].name));
      } catch (error) {
        console.error(error);
      }
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
      if (guessIndex < 5) {
        // ensure key is in alphabet (qwerty: 65-90)
        if (event.keyCode >= 65 && event.keyCode <= 90) {
          updateCurrentGuess(event.key);
        }
        // todo: handle azerty keyboard accent keys
        // azerty: 65-90 and 50, 55, 57, 48, 192, 229

        // backspace
        if (event.keyCode == 8) {
          handleBackspace();
        }
      }

      if (guessIndex == 5) {
        // enter
        if (event.keyCode == 13) {
          console.log("enter");
          // console.log("current guess is: " + currentGuess);
          console.log("guesses: " + guesses[0].word);
          verifyGuess();
        }
      }
    }
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
  
  // update current guess
  function updateCurrentGuess(char) {
    incrementGuessIndex();
    setCurrentGuess(currentGuess => currentGuess.substring(0, guessIndex) + char + currentGuess.substring(guessIndex + 1));
  };
  
  // handle backspace event
  function handleBackspace() {
    setCurrentGuess(currentGuess => currentGuess.substring(0, currentGuess.length - 1));
    decrementGuessIndex();
  };

  // render current guess on grid
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
  
  function incrementGuessIndex() {
    guessIndex = guessIndex + 1;
    // setGuessIndex(guessIndex => guessIndex + 1);
  };

  function decrementGuessIndex() {
    guessIndex = guessIndex - 1;
  };

  /*=================================================================
    SUBMITTING GUESS
  =================================================================*/
  // update guesses list
  function updateGuessList(guess) {   
    setGuesses([
      ...guesses, guess
    ]);
  };
  
  // self explanatory i hope
  function incrementGuessNumber() {
    setGuessNumber(guessNumber => guessNumber + 1);
  };

  // verify guess
  async function verifyGuess() {
    let guess = currentGuess;
    // console.log("you guessed " + currentGuess);
    setDisplayGuess(true);

    await checkIfFrenchWord(guess);      
    console.log(`is it a real word??? ${isFrenchWord}`);
    
    if (isFrenchWord && guess.length === 6) {
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
        // todo: accent handling
      }

      console.log("guess " + guess + ", status: " + verifArray);
      
      // add guess to guesses array, increment guess count
      let guessesTmp = [...guesses];
      guessesTmp[guessNumber - 1] = {word: guess, status: verifArray};
      setGuesses(() => guessesTmp);
      incrementGuessNumber();
    }
  };

  async function checkIfFrenchWord (word) {
    console.log(`checking if ${word} is a real word!`);
    const url = `https://fr.wiktionary.org/w/api.php?action=query&format=json&titles=${word}`;

    try {
        let response = await fetch(url);
        response = await response.json();
        // if page does not exist
        if('-1' in response.query.pages) {
            console.log("pg does not exist");
            isFrenchWord = false;
        }
    } catch (error) {
        console.error(error);
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

  /*=================================================================
    HELPERS
  =================================================================*/
  function testGuess({display}) {
    if(display) {
      return <p>{currentGuess}</p>
    } else {
      return <p>guess not yet submitted</p>
    }
  }

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
        <testGuess display={displayGuess} />
      </div>
    </div>
  );
}

export default App;
