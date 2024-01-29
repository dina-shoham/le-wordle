/* word guess component */
import './../styles.css';

function LetterTile({letter}) {
    return <button className="square">{letter}</button>;
}

export default LetterTile;
