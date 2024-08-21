/* word guess component */
import './../styles.css';

function LetterTile({letter, status}) {
    let className = "square";
    if (status === -1) {
        className="square square-white";
    } else if (status === 0) {
        className="square square-grey";
    } else if (status === 1) {
        className="square square-yellow";
    } else if (status === 2) {
        className="square square-green";
    }

    return <button className={className}>{letter}</button>;
}

export default LetterTile;
