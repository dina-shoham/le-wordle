import React, { useState } from 'react';
import './App.css';

function App () {
  
  const [word, setWord] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState(["hello", "world"]);
  
  const guessesList = guesses.map(guess =>
    <li>{guess} x</li>
  );

  function fetchWord() {
    fetch('https://trouve-mot.fr/api/size/6')
      .then(response => response.json())
      .then(data => setWord(data[0].name))
      .catch(error => console.error(error));
    console.log(word);
  };

  function checkIfRealWord(word) {
    // check word's validity
  };

  function verifyGuess() {
    console.log("verifying");
    console.log(currentGuess);
  };

  const handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  };

  return (
    <div className="App">
      <p>bienvenue a le wordle</p>
      <button onClick={fetchWord}>fetch word</button>
      <br/>
      <form onSubmit={handleSubmit}>
        <label>devinez un mot:
          <input type="text"
                  name="guess"
                  // onChange={e => setCurrentGuess(e)}
          />
        </label>
        <input type="submit"/>
      </form>
      <ul>{guessesList}</ul>
    </div>
  );
}

export default App;
