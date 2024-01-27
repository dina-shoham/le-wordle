/* component for inputting guesses */

function GuessInput() {
    function checkGuess (guess) {
        console.log("checking...");
    }

    return (
        <div>
            <form onSubmit = {checkGuess}>
                <input name="guess" />
                <input type="submit" value="enter"/>
            </form>
        </div>
    )
}

export default GuessInput;
