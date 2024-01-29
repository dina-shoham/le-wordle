/* component for inputting guesses */
import React, { useState } from 'react';

function GuessInput({solution, guessIncrementer, guessListUpdater}) {

    const [guessWord, setGuessWord] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        let verifArray = [-1, -1, -1, -1, -1, -1];

        if (isRealFrenchWord(guessWord) && guessWord.length == 6) {
        // if (isRealFrenchWord(guess.word) && guess.word.length == 6) {
            // verify word against solution
            for (let i = 0; i < guessWord.length; i++) {
                if (solution[i] == guessWord[i]) {
                    verifArray[i] = 2; // green
                    continue;
                } else if (solution.includes(guessWord[i])) {
                    verifArray[i] = 1; // yellow
                } else {
                    verifArray[i] = 0; // grey
                }
            }

            // set guess, increment guess count
            const guess = {word: guessWord, status: verifArray};
            guessListUpdater(guess);
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
                    onChange={event => setGuessWord(event.target.value)}/>
                <input type="submit" value="enter"/>
            </form>
        </div>
    )
}

export default GuessInput;
