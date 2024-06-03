# anki-geoguessr-instructions
Instructions on how to build Anki decks for Geoguessr, using Geohints as source

## Poles
1. Go to geohints.com and go to the poles page
2. Open the dev tools with F12
3. Copy the following and paste it in the dev tools console:
```js
// TODO: ADD SCRIPT
// Select all image tag src's in array, get final part with src.split('/').pop()

// Select all countries by selecting .country elements and saving the innerText to its own array

// Create comma separated string array from both arrays

// join string array with 'newline' character and use it for csv
```
4. Now download the images from the webpage, there are browser extensions to do this
5. Create a new deck in Anki, make sure the new deck is selected when importing the csv
