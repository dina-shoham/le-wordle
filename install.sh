#!/bin/sh

ROOT=/data/dina/le-wordle

if [ -d $ROOT ] ; then
  echo "$ROOT already exists"
else
  mkdir $ROOT
  chmod 755 $ROOT
fi

if [ -d $ROOT/components ] ; then
  echo "$ROOT/components already exists"
else
  mkdir $ROOT/components
  chmod 755 $ROOT/components
fi

if [ -d $ROOT/dictionary ] ; then
  echo "$ROOT/dictionary already exists"
else
  mkdir $ROOT/dictionary
  chmod 755 $ROOT/dictionary
fi

ROOT_FILES="\
  styles.css\
  App.js\
  index.js\
  "

COMPONENTS_FILES="\
  LetterTile.js\
  Key.js\
  Keyboard.js\
  Guess.js\
  "

DICTIONARY_FILES="\
  six-letter-words.txt\
  words.txt\
  filterwords.sh\
  words.js\
  "

for f in $ROOT_FILES; do
  echo "Installing $f"
  cp src/$f $ROOT/$f
  chmod 644 $ROOT/$f
done

for f in $COMPONENTS_FILES; do
  echo "Installing components/$f"
  cp src/components/$f $ROOT/components/$f
  chmod 644 $ROOT/components/$f
done

for f in $DICTIONARY_FILES; do
  echo "Installing dictionary/$f"
  cp src/dictionary/$f $ROOT/dictionary/$f
  chmod 644 $ROOT/dictionary/$f
done

