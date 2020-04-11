
var fs = require('fs');
const request = require("request-promise-native");

var asyncLoop = require('node-async-loop');
 


async function downloadPDF(pdfURL, outputFilename) {
    let pdfBuffer = await  request.get({uri: pdfURL, encoding: null}).on('error', function(err) {
        console.error(err)
      });
    
    console.log("Writing downloaded PDF file to " + outputFilename + "...");
    fs.writeFileSync(outputFilename, pdfBuffer);
}

var contents = fs.readFileSync('pdf.txt', 'utf8');
var string = contents.split("\n");

var downloadfile = async function(item, next) {
        var patt = /(com\/.{8}\/)(.*)$/gm
        fileName = patt.exec(item);            
        if(fileName[2]) {
            console.log(fileName[2]);
            await downloadPDF(item,"pdf/"+fileName[2]);
        }
        next();
}

asyncLoop(string,downloadfile);