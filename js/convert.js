const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

const { execSync, execFileSync } = require('child_process');

const config = require('config');

const useLibreOffice = config.get("Convert.useLibreOffice");
const cmdLibreOffice = config.get("Convert.LibreOffice.cmdLibreOffice");

if (!config.get("Convert.active")) {
    console.log('Die Konvertierung ist im Config deaktiviert!!!');
    return;
}

console.log(' ');
console.log('***** Konvertierung START *********************************************');

var mainFolder = __dirname + "/../";
mainFolder = mainFolder.replace(/\\/g, "\/");
var oriFolder = mainFolder + "oriDocs/";
var exportFolder = mainFolder + "docs/img/ppt/";

fsExtra.emptyDirSync(exportFolder);

var cmd = "";
fs.readdir(oriFolder, (err, files) => {
    files.forEach(file => {
        var ext = path.extname(file); 
        if (ext == ".pptx") {
            var filename = path.basename(file, ext);
            if (useLibreOffice) {
                cmd = buildConvertLibreOffice(filename);
            }
            else {
                cmd = buildConvertPS(filename);
            }
            execSync(cmd);
        }
    });
    console.log('***** Konvertierung ENDE **********************************************');
    console.log(' ');
});

function buildConvertLibreOffice(file) {
    var cmd = "";
    cmd = '"' + cmdLibreOffice + '" --convert-to jpg ' + oriFolder + file + '.pptx --headless -outdir ' + exportFolder;
    console.log(cmd);
    return cmd;
}

function buildConvertPS(file) {
    var oriFolderBS = oriFolder.replace(/\//g, "\\");
    var exportFolderBS = exportFolder.replace(/\//g, "\\");
    var cmd = "";

    const allSlides = config.get("Convert.PowerPoint.allSlides");
    if (allSlides) {
        //Multiple Slides 
        cmd = 'powershell "& "' + oriFolderBS + 'ppt2jpg.ps1 -singleSlide $False -pptFile "' + oriFolderBS + file + '.pptx" -outputName "' + exportFolderBS + file + '"';
    }
    else {
        //Single Slide
        cmd = 'powershell "& "' + oriFolderBS + 'ppt2jpg.ps1 -singleSlide $True -pptFile "' + oriFolderBS + file + '.pptx" -slide 1 -outputName "' + exportFolderBS + file + '.jpg"';
    }
    console.log(cmd);
    return cmd;
}