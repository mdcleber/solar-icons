const { readdirSync, rename } = require('fs');
const { resolve } = require('path');

// Get path to image directory
const imageDirPath = resolve(__dirname, './raw-icons');

// Get an array of the files inside the folder
const files = readdirSync(imageDirPath);

// Loop through each file that was retrieved
files.forEach(file => {
    let newFileName = file.replace(/icon[s]?|ui|core|[ ()\-]/g, "_");
    newFileName = newFileName.replace('__', '_').toLocaleLowerCase();
    
    console.log("🚀 ~ newFileName:", newFileName)
    
    rename(
  imageDirPath + `/${file}`,
  imageDirPath + `/${newFileName}`,
  err => console.log(err)
    );
});
