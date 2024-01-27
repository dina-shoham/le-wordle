/* component for inputting guesses */

function GuessInput({solution}) {
    function checkGuess (guess) {
        console.log("checking...");
    }

    return (
        <div>
            <form onSubmit={checkGuess}>
                <input name="guess" />
                <input type="submit" value="enter"/>
            </form>
            <p>solution in this component is {solution}</p>
        </div>
    )
}

export default GuessInput;
