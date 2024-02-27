# Le Wordle
Pour mes enfants d'acceuil, qui veulent toujours faire le wordle avec moi mais qui n'arrive jamais à trouver des mots anglais.

## basic idea

- pretty much the same as the wordle except:
    - french
    - six letter word
    - seven guesses
    - probably a bit shittier

## tech stack

- react app
- apis:
    - trouve-mot → generating solution
    - wikimedia → checking if a word is a real french word (change later)
- libraries:
    - create-react-app
    - toastify for notif messages (win/lose) [https://github.com/apvarun/toastify-js/blob/master/README.md](https://github.com/apvarun/toastify-js/blob/master/README.md)

## features

**required features:**

- [x]  generate random word for solution upon initial render (useEffect, [])
    - [x]  [trouve-mot.fr](http://trouve-mot.fr) api
- [ ]  input guess
    - [x]  type guess in grid
        - [ ]  submit guess (NOT WORKING RN!)
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
            - [ ]  handle repeat letters (at least one green or yellow)
- [ ]  guess grid
    - [x]  components:
        - [x]  show grid of all seven guesses at beginning
            - [x]  type in the boxes instead of in input
        - [x]  single guess component, render list of each guess
        - [x]  letter tiles
            - [x]  change colour: default, grey, yellow, and green
- [ ]  onscreen keyboard
    - [ ]  get layout working
    - [ ]  change colours
- [ ]  game functionality
    - [x]  lose after 7 guesses
        - [x]  display error message
        - [x]  disable input
    - [x]  win if they get it right
    - [ ]  new colour for right letter, wrong accent
    - [ ]  disable special characters and numbers
- [ ]  styling:
    - [ ]  animate letters
    - [ ]  capital letters
    - [ ]  toast boxes (move styling to css file)
    - [ ]  center everything
    - [ ]  polish page
        - [ ]  header/nice looking site title
        - [ ]  center page, add margins
        - [ ]  favicon, site title

**nice to haveS:**

- [ ]  onscreen keyboard
- [ ]  param for word length
- [ ]  dark mode
- [ ]  instructions
- [ ]  homepage
- [ ]  web hosting
- [ ]  switch api calls to a library of most common french words