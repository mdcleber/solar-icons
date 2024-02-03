const { readdirSync, rename } = require('fs');
const { resolve } = require('path');

// Get path to image directory
const imageDirPath = resolve(__dirname, './icons');

// Get an array of the files inside the folder
const files = readdirSync(imageDirPath);

// Loop through each file that was retrieved
files.forEach(file => rename(
  imageDirPath + `/${file}`,
  imageDirPath + `/${file.toLowerCase()}`,
  err => console.log(err)
));