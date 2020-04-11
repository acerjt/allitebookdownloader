const request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');

var booksPage = [];
for (let j = 191; j <= 200; j++) {
  request('http://www.allitebooks.com/page/' + j + '/', function (error, response, body) {

    var $ = cheerio.load(body);

    var booksDOM = $('h2.entry-title a');
    for (let i = 0; i < 10; i++) {
      if (booksDOM[i]) {
        //   booksPage.push({ 
        //     link: booksDOM[i].attribs.href,
        //     title: booksDOM[i].children[0].data,
        //   });
        request(booksDOM[i].attribs.href, function (err, res, body) {

          var $ = cheerio.load(body);
          if ($('i.fa-download').parent()[0]) {
            var urlPDFFile = $('i.fa-download').parent()[0].attribs.href;

            console.log(urlPDFFile);
            fs.appendFile('101to200.txt', urlPDFFile + "\n", function (err) {
              if (err) console.log('fail');
            });

          }

        });

      }
    }
  });
}