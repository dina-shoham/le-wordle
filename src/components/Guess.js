/* word guess component */
import LetterTile from './LetterTile';

function Guess({word, statusArr}) {
    const wordArray = Array.from(word);
    console.log("in guess, array is:");
    console.log(wordArray);
    console.log("still in guess, statusArr is");
    console.log(statusArr);
    return (
        <div>
            {wordArray.map((letter, index) => {
                console.log("in map");
                return <LetterTile key={index} 
                                   letter={letter}
                                   status={statusArr[index]}/>
            })}
        </div>
    )
}

export default Guess;
