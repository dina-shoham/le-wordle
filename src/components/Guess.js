/* word guess component */
import LetterTile from './LetterTile';

function Guess({word, statusArr}) {
    const wordArray = Array.from(word);
    return (
        <div>
            {wordArray.map((letter, index) => {
                return <LetterTile key={index} 
                                   letter={letter}
                                   status={statusArr[index]}/>
            })}
        </div>
    )
}

export default Guess;
