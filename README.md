# Le Wordle
Pour mes enfants d'acceuil, qui veulent toujours faire le wordle avec moi mais qui n'arrive jamais à trouver des mots anglais.

## try it out for yourself!
although there are a few bugs remaining, you are welcome to try it out! you can run the app by downloading the source code locally and running ```npm start``` in the src folder.

## basic idea

- pretty much the same as the wordle except:
    - french
    - six letter word
    - seven guesses
    - probably a bit shittier
    - no accentS!! to make my life easier

## tech stack

- react app
- libraries:
    - create-react-app
    - list of french words: [https://github.com/Taknok/French-Wordlist/blob/master/francais.txt](https://github.com/Taknok/French-Wordlist/blob/master/francais.txt)
    - toastify for notif messages (win/lose) [https://github.com/apvarun/toastify-js/blob/master/README.md](https://github.com/apvarun/toastify-js/blob/master/README.md)

## features

**required features:**

- [x]  generate random word for solution upon initial render (useEffect, [])
    - [x]  [trouve-mot.fr](http://trouve-mot.fr) api
- [ ]  input guess
    - [x]  type guess in grid
        - [x]  submit guess
        - [ ]  bug: squares shift down when user starts typing
    - [x]  components: one component with text input + submit button
        - [x]  clear input after submit but do not refresh the page
    - [x]  input validation:
        - [x]  6 letter word
        - [x]  real french word
            - [x]  need a french dictionary api → [https://api.lexicala.com/sign-up/](https://api.lexicala.com/sign-up/)
    - [x]  check guess:
        - [x]  check against solution
            - [x]  create verification array (length 6 to correspond w word)
                - [x]  ints: -1 = not yet verified, 0 = incorrect/gray, 1 = wrong position/yellow, 2 = correct/green
            - [x]  iterate over letters of word, setting status
            - [x]  pass solution back to app??
            - [x]  handle repeat letters (at least one green or yellow)
- [x]  guess grid
    - [x]  components:
        - [x]  show grid of all seven guesses at beginning
            - [x]  type in the boxes instead of in input
        - [x]  single guess component, render list of each guess
        - [x]  letter tiles
            - [x]  change colour: default, grey, yellow, and green
- [ ]  onscreen keyboard
    - [x]  get layout working
    - [x]  change colours
    - [x]  add delete and enter buttons
    - [ ]  make keys clickable
    - [ ]  bug: keys don't change after winning
- [ ]  game functionality
    - [x]  lose after 7 guesses
        - [x]  display error message
        - [x]  disable input
    - [x]  win if they get it right
    - [ ]  disable special characters and numbers
- [ ]  styling:
    - [ ]  animate letters
    - [x]  capital letters
    - [x]  center everything
    - [ ]  polish page
        - [x]  header/nice looking site title
        - [x]  favicon, site title
        - [ ]  instructions popup

**nice to haves:**

- [ ]  param for word length
- [ ]  dark mode
- [ ]  instructions
- [ ]  homepage
- [ ]  web hosting
- [x]  switch api calls to a library of most common french words
