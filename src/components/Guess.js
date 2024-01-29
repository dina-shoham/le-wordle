/* word guess component */
import LetterTile from './LetterTile';

function Guess({word}) {
    const wordArray = Array.from(word);
    console.log("in guess, array is:");
    console.log(wordArray)
    return (
        <div>
            {wordArray.map((letter, index) => {
                console.log("in map");
                return <LetterTile key={index} letter={letter}/>
            })}
        </div>
    )
}

export default Guess;
