# anki-geoguessr-instructions
Instructions on how to build Anki decks for Geoguessr, using Geohints as source

## Poles and Bollards
1. Go to geohints.com and go to the poles or bollards page
2. Open the dev tools with F12
3. Copy the following and paste it in the dev tools console:
```js
// Select all image tag src's in array, get final part of each image
window.images = [];
document.querySelectorAll('.bollard img').forEach(element => window.images.push(element.src.split('/').pop()));

// Select all countries by selecting .country elements and saving the innerText to its own array
window.countries = [];
document.querySelectorAll('.country').forEach(element => window.countries.push(element.innerText));

// Generate CSV string from both arrays
window.csvString = `data:text/csv;charset=utf-8,${window.images.map((img, index) => `<img src="${img}">,${window.countries[index]}`).join('\n')}`;

// Open string in browser to download input as CSV
window.open(encodeURI(window.csvString));
```
4. Now download the images from the webpage, there are browser extensions to do this
5. Move the images to the Anki media folder; see more here: https://docs.ankiweb.net/media
6. Create a new deck in Anki
7. Go to File -> Import... to import the CSV in your new deck. **Make sure the right deck is selected when importing**
