/* component for inputting guesses */
import React, { useState } from 'react';

function GuessInput({solution, guessIncrementer, currentGuessSetter, guessListUpdater}) {

    const [guess, setGuess] = useState({word: "", status: []});

    const handleSubmit = event => {
        event.preventDefault();

        let verifArray = [-1, -1, -1, -1, -1, -1];

        if (isRealFrenchWord(guess.word) && guess.word.length == 6) {
            // verify word against solution
            for (let i = 0; i < guess.word.length; i++) {
                if (solution[i] == guess[i]) {
                    verifArray[i] = 2; // green
                    continue;
                } else if (solution.includes(guess[i])) {
                    verifArray[i] = 1; // yellow
                } else {
                    verifArray[i] = 0; // grey
                }
            }

            // set guess, increment guess count
            setGuess({...guess, status: verifArray});
            guessListUpdater(guess);
            // currentGuessSetter({word: guess, status: verifArray});
            guessIncrementer();
        } else {
            console.log("not a word");
            // need to add error handling
        }
    }

    function isRealFrenchWord (word) {
        return true;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="guess"
                    required
                    minLength="6"
                    maxLength="6"
                    onChange={event => setGuess({word: event.target.value})}/>
                <input type="submit" value="enter"/>
            </form>
        </div>
    )
}

export default GuessInput;
