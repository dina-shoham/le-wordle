/* component for inputting guesses */
import React, { useState } from 'react';

function GuessInput({solution, guessIncrementer, currentGuessSetter}) {

    const [guess, setGuess] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        let verifArray = [-1, -1, -1, -1, -1, -1];
        if (isRealFrenchWord(guess) && guess.length == 6) {
            // verify word against solution
            for (let i = 0; i < guess.length; i++) {
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
            currentGuessSetter({word: guess, status: verifArray});
            guessIncrementer();
            console.log("word verified");
            console.log(verifArray);
        } else {
            console.log("not a word");
            // need to add error handling
        }
        console.log("checking...");
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
                    onChange={event => setGuess(event.target.value)}/>
                <input type="submit" value="enter"/>
            </form>
            <p>solution in this component is {solution}</p>
        </div>
    )
}

export default GuessInput;
