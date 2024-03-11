import Key from './Key';

function Keyboard({keyStatusArray}) {
    const row1Arr = ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const row2Arr = ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm']
    const row3Arr = ['w', 'x', 'c', 'v', 'b', 'n']

    return (
        <div className='container'>
            {/* first row (AZERTYUIOP) */}
            <div>
                {row1Arr.map((letter, index) => {
                    return <Key key={index} 
                    letter={letter}
                                status={keyStatusArray[index]}/>
                            })}
            </div>

            {/* second row (QSDFGHJKLM) */}
            <div>
                {row2Arr.map((letter, index) => {
                    return <Key key={index} 
                    letter={letter}
                    status={keyStatusArray[index + 10]}/>
                })}
            </div>

             {/* third row (WXCVBN) */}
             <div>
                {row3Arr.map((letter, index) => {
                    return <Key key={index} 
                    letter={letter}
                    status={keyStatusArray[index + 10 + 10]}/>
                })}
            </div>
        </div>
    )
}

export default Keyboard;