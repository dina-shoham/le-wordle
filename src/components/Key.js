/* key component */
import './../styles.css';

function Key({letter, status, setKeyClicked}) {
    let className = "key";
    if (status == -1) {
        className="key key-light-grey";
    } else if (status == 0) {
        className="key key-grey";
    } else if (status == 1) {
        className="key key-yellow";
    } else if (status == 2) {
        className="key key-green";
    } else if (status == 3) {
        className="key key-wide";
    }

    let onClick = () => {
        console.log("clicked " + letter);
        setKeyClicked(() => letter);
    }

    return <button className={className} onClick={onClick}>{letter}</button>;
}

export default Key;
