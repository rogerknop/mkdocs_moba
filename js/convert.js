const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

const { execSync, execFileSync } = require('child_process');

const libreOffice = "C:/Program Files/LibreOffice/program/soffice.exe";

console.log(' ');
console.log('***** Konvertierung START *********************************************');

var mainFolder = __dirname + "/../";
mainFolder = mainFolder.replace(/\\/g, "\/");
var oriFolder = mainFolder + "oriDocs/";
var exportFolder = mainFolder + "docs/img/ppt/";

fsExtra.emptyDirSync(exportFolder);

fs.readdir(oriFolder, (err, files) => {
    files.forEach(file => {
        var ext = path.extname(file); 
        if (ext == ".pptx") {
            var filename = path.basename(file, ext);
            var cmd = buildConvertPS(filename);
            execSync(cmd);
        }
    });
    console.log('***** Konvertierung ENDE **********************************************');
    console.log(' ');
});

function buildConvertCmd(file) {
    var cmd = "";
    cmd = '"' + libreOffice + '" --convert-to jpg ' + oriFolder + file + '.pptx --headless -outdir ' + exportFolder;
    console.log(cmd);
    return cmd;
}

function buildConvertPS(file) {
    var oriFolderBS = oriFolder.replace(/\//g, "\\");
    var exportFolderBS = exportFolder.replace(/\//g, "\\");
    var cmd = "";
    //Single Slide - cmd = 'powershell "& "' + oriFolderBS + 'ppt2jpg.ps1 -singleSlide $True -pptFile "' + oriFolderBS + file + '.pptx" -slide 1 -outputName "' + exportFolderBS + file + '.jpg"';
    cmd = 'powershell "& "' + oriFolderBS + 'ppt2jpg.ps1 -singleSlide $False -pptFile "' + oriFolderBS + file + '.pptx" -outputName "' + exportFolderBS + file + '"';
    console.log(cmd);
    return cmd;
}