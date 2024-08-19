/* word guess component */
import './../styles.css';

function LetterTile({letter, status}) {
    let className = "square";
    if (status === -1) {
        className="square";
    } else if (status === 0) {
        className="square-grey";
    } else if (status === 1) {
        className="square-yellow";
    } else if (status === 2) {
        className="square-green";
    }

    return <button className={className}>{letter}</button>;
}

export default LetterTile;
