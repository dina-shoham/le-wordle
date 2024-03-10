#!/bin/bash

input="words.txt"
output="six-letter-words.txt"

while read -r line
do
	if [[ ${#line} == 6 && ${line:0:1} == [a-z] ]] 
	then 
		echo "$line" >> $output 
	fi
done < "$input"
