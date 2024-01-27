import React, { useState, useEffect } from 'react';
import Guess from './components/Guess';
import GuessInput from './components/GuessInput';
import './App.css';

function App () {
  
  const [solution, setSolution] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState(["hello", "world"]);
  
  // const guessesList = guesses.map(guess =>
  //   <li>{guess} x</li>
  // );

  // call generate solution, empty array to ensure it only happens once
  useEffect(() => {
    async function generateSolution() {
      try {
        let response = await fetch('https://trouve-mot.fr/api/size/6');
        response = await response.json();
        console.log("response:");
        console.log(response);
        setSolution(response[0].name);
      } catch (error) {
        console.error(error);
      }
    };
    generateSolution();
  }, []);

  // const generateSolution = () => {
  //   fetch('https://trouve-mot.fr/api/size/6')
  //     .then(response => response.json())
  //     .then(data => setSolution(data[0].name))
  //     .catch((error) => console.error(error));
  //   console.log(solution);
  // }

  // function checkIfRealWord(word) {
  //   // check word's validity
  // };

  // function verifyGuess() {
  //   console.log("verifying");
  //   console.log(currentGuess);
  // };

  // const handleSubmit = (event) => {
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
  // };

  return (
    <div>
      <h1>bienvenue au wordle</h1>
      <GuessInput/>
      <div>
      <Guess word='tester'/>
      </div>
      <div>
        <p>solution is: {solution}</p>
      </div>
      {/* <p>bienvenue a le wordle</p>
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
      <ul>{guessesList}</ul> */}
    </div>
  );
}

export default App;
