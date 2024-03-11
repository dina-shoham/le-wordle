function Keyboard({letterArray}) {
    return (
        <div>
            {wordArray.map((letter, index) => {
                return <Key key={index} 
                            letter={letter}
                            status={letterArray[index]}/>
            })}
        </div>
    )
}

export default Guess;