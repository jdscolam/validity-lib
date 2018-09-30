# validity-lib
A fun little library for determining duplicate contacts.  There are both normal and advanced datasets for you to play with in the `/data` directory.

## Installation
Simply `clone` or `fork` the repository then run:
```
npm install
```
in the root of the repository.

## Run the App
```
npm start
```

**NOTE:** `main.js` in the root directory is the entry-point.  This is so ES6 node works properly ([thank you esm!](https://github.com/standard-things/esm))

## Run the Unit Tests
```
npm test
```
'nuff said.

## Some Notes

1. This algorithm is NOT suited for non-business related contact de-duplication.  It makes assumptions based on the data structure that the contacts won't be people living at the same address with different first names that share a phone number and email address (e.g. older married couples, or families with land-lines).
1. Further work could be done on data cleaning, testing, validation, and edge case checking
1. Performance will definitely start to degrade if you have more than 3k - 4k nameAddress keys and you start to have lots of obscure, and kind of similar names.  This is really due to the distance function.  Frankly optimizing the search around alphabetical order may help resolve that.
1. the nameAddress keys should likely be generated up-front at parsing time by the contact itself.  That would be a good/simple refactor which would make things easier to read and faster to execute.
1. Metaphone 3 is likely a better/faster way of handling the names, however it's ~$260 for a license right now
