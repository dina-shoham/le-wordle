# Le Wordle
Pour mes enfants d'acceuil, qui veulent toujours faire le wordle avec moi mais qui n'arrive jamais à trouver des mots anglais.
A React/JS Wordle clone in French, with six letter words, seven guesses, and no accents to make my life easier.

## Try it out for yourself!
The app is currently hosted on shoham.ca/dina/le-wordle (it's ugly on mobile, apologies!)

## Tech Stack

- React App (using the classics: node, JS, CSS, etc.)
- Libraries:
    - create-react-app
    - list of french words: [https://github.com/Taknok/French-Wordlist/blob/master/francais.txt](https://github.com/Taknok/French-Wordlist/blob/master/francais.txt)
    - toastify for notif messages (win/lose) [https://github.com/apvarun/toastify-js/blob/master/README.md](https://github.com/apvarun/toastify-js/blob/master/README.md)

## Features

**required features:**

- [x]  generate random word for solution upon initial render (useEffect, [])
    - [x]  picks a random line number from `src/dictionary/words`
- [ ]  input guess
    - [x]  type guess in grid
        - [x]  submit guess
        - [x]  bug: squares shift down when user starts typing
    - [x]  components: one component with text input + submit button
        - [x]  clear input after submit but do not refresh the page
    - [x]  input validation:
        - [x]  6 letter word
        - [x]  real french word
            - [x]  need a french dictionary -> ended up using [this](https://github.com/Taknok/French-Wordlist/blob/master/francais.txt) instead of an API like Lexicala or Wiktionnaire
    - [x]  check guess:
        - [x]  check against solution
            - [x]  create verification array (length 6 to correspond w word)
                - [x]  ints: -1 = not yet verified, 0 = incorrect/gray, 1 = wrong position/yellow, 2 = correct/green
            - [x]  iterate over letters of word, setting status
            - [x]  handle repeat letters (at least one green or yellow)
- [x]  guess grid
    - [x]  components:
        - [x]  show grid of all seven guesses at beginning
            - [x]  type in the boxes instead of in input
        - [x]  single guess component, render list of each guess
        - [x]  letter tiles
            - [x]  change colour: default (light grey), grey, yellow, and green
- [ ]  onscreen keyboard
    - [x]  get layout working
    - [x]  change colours
    - [x]  add delete and enter buttons
    - [ ]  make keys clickable
    - [x]  bug: keys don't change after winning
- [x]  game functionality
    - [x]  lose after 7 guesses
        - [x]  display error message
        - [x]  disable input
    - [x]  win if they get it right
    - [x]  disable special characters and numbers
- [ ]  styling:
    - [ ]  animate letters
    - [x]  capital letters
    - [x]  center everything
    - [x]  polish page
        - [x]  header/site title
        - [x]  favicon, site title

**nice to haves:**

- [ ]  param for word length
- [ ]  dark mode
- [ ]  instructions
- [x]  web hosting
- [x]  switch api calls to a library of most common french words
