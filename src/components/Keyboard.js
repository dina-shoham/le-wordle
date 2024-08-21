import Key from './Key';

function Keyboard({keyStatusArray,  setKeyClicked}) {
    const row1Arr = ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const row2Arr = ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm']
    const row3Arr = ['w', 'x', 'c', 'v', 'b', 'n']

    return (
        <div className='container'>
            {/* first row (AZERTYUIOP) */}
            <div>
                {row1Arr.map((letter, index) => {
                    return <Key key={index} 
                    setKeyClicked={setKeyClicked}
                    // onClick={onClick}
                    letter={letter}
                    status={keyStatusArray[index]}/>
                })}
            </div>

            {/* second row (QSDFGHJKLM) */}
            <div>
                {row2Arr.map((letter, index) => {
                    return <Key key={index} 
                    setKeyClicked={setKeyClicked}
                    // onClick={onClick}
                    letter={letter}
                    status={keyStatusArray[index + 10]}/>
                })}
            </div>

             {/* third row (WXCVBN) */}
             <div>
                <Key 
                     setKeyClicked={setKeyClicked}
                // onClick={onClick}
                     letter="entrée" 
                     status="3"/>
                {row3Arr.map((letter, index) => {
                    return <Key key={index} 
                    setKeyClicked={setKeyClicked}
                    // onClick={onClick}
                    letter={letter}
                    status={keyStatusArray[index + 10 + 10]}/>
                })}
                <Key 
                     setKeyClicked={setKeyClicked}
                // onClick={onClick}
                     letter="suppr"
                     status="3"/>
            </div>
        </div>
    )
}

export default Keyboard;