

# Show & Do Booking System Prototype

This is a prototype of a booking system for Show & Do Competence Sessions. This project is built on the CMS Contentful. Using Javascript.


## Requirements 

| Prerequisite                       | How to check  | How to install
| ---------------------------------- | ------------- | ------------- |
| Node.js 0.12.x                     | `node -v`     | [nodejs.org](http://nodejs.org/) |
| gulp >= 3.8.10                     | `gulp -v`     | `npm install -g gulp` |
| Browserify >= 14.3.0               | `-`           | `-` |
| Browser-sync >= 2.18.8             | `-`           | `-` |
| Contentful >= 3.8.1                | `-`           | `-` |
| Contentful-management >= 1.3.1     | `-`           | `-` |
| jquery >= 3.2.1                    | `-`           | `-` |
| npm >= 4.4.4                       | `-`           | `-` |


## Install

After download run:
"npm install" 
in bash


For description of use contet types and content in contentful, se description fields in Make ing Waves Contentful API.









## It is not recomended to add track from Contentful, becouse several fields is fild with set values from the code. Setting the values incorrectly from Contentful API might break the sorting funktions!!
(If you do it against our recomendation, you will have to fill _ALL_ fields with a value. Including People attending!)

|
|
|
|
|
|
|

## Small issues and tips about Contentful:

 - All events in each date in the "Dates for Show & Do" have to be publish (no drafts) or the website will not work properly.

 - If your useing Content Management key, it is not possible to change the information in contentful from the website, if the owner of the key is in an     editing mode in the Contentful API.

 - If time and size is not correctly filled the sorting functions will not work. 


