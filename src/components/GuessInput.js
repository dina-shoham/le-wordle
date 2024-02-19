/* component for inputting guesses */
import React, { useState } from 'react';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function GuessInput({solution, guessIncrementer, guessListUpdater, disabled}) {

    const [guessWord, setGuessWord] = useState("");
    let isFrenchWord = true;

    async function handleSubmit (event) {
        console.log(`solution: ${solution}`)

        event.preventDefault();
        await checkIfFrenchWord();        
        console.log(`is it a real word??? ${isFrenchWord}`);
        
        let verifArray = [-1, -1, -1, -1, -1, -1];
        if (isFrenchWord && guessWord.length === 6) {
            // verify word against solution
            for (let i = 0; i < guessWord.length; i++) {
                if (solution[i] === guessWord[i]) {
                    verifArray[i] = 2; // green
                    continue;
                } else if (solution.includes(guessWord[i])) {
                    // check for existing yellows with same letter
                    if (i > 0) {
                        for (let j = 0; j < i; j++) {
                            if ((verifArray[j] === 1) && guessWord[i] === guessWord[j]) {
                                verifArray[i] = 0;
                                console.log(`duplicate yellow at ${i} and ${j} - ${guessWord[i]}`)
                                break;
                            } else {
                                verifArray[i] = 1; // yellow
                            }
                        }
                    } else {
                        verifArray[i] = 1;
                    }
                } else {
                    verifArray[i] = 0; // grey
                }
            }

            // double check the word and reset yellows if there are greens
            for (let i = 0; i < guessWord.length; i++) {
                if (verifArray[i] === 2) {
                    for (let j = 0; j < guessWord.length; j++) {
                        if (guessWord[j] === guessWord[i] && verifArray[j] === 1 && i!==j) {
                            console.log("dup letters, one is green");
                            verifArray[j] = 0;
                            break;
                        }
                    }
                }
            }

            // set guess, increment guess count
            const guess = {word: guessWord, status: verifArray};
            guessListUpdater(guess);
            guessIncrementer();            
        } else {
            console.log("not a word");
            // show "you lost" message
            Toastify({
                text: `Pas un vrai mot!`,
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
        setGuessWord('');
    }

    async function checkIfFrenchWord () {
        console.log(`checking if ${guessWord} a real word!`);
        const url = `https://fr.wiktionary.org/w/api.php?action=query&format=json&titles=${guessWord}`;

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
    }
    
    return (
        <div>
            <fieldset disabled={disabled}>
                <form onSubmit={handleSubmit}>
                    <input name="guess"
                        required
                        minLength="6"
                        maxLength="6"
                        value={guessWord}
                        onChange={event => setGuessWord(event.target.value)}/>
                    <input type="submit" value="enter"/>
                </form>
            </fieldset>
        </div>
    )
}

export default GuessInput;
