/* key component */
import './../styles.css';

function Key({letter, status}) {
    let className = "key";
    if (status == -1) {
        className="key";
    } else if (status == 0) {
        className="key-grey";
    } else if (status == 1) {
        className="key-yellow";
    } else if (status == 2) {
        className="key-green";
    } else if (status == 3) {
        className="key-wide";
    }

    return <button className={className}>{letter}</button>;
}

export default Key;
