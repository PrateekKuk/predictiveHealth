var fetch = require('node-fetch');
var cheerio = require('cheerio');
var request = require('request');
var rp = require('request-promise');
var minify = require('html-minifier').minify;
var request_sync = require('sync-request');
var fs = require('fs');
var app = {};

var urls = [];
urls.push({name:"metformin",url:'https://www.patientslikeme.com/treatments/show/221'}); 



app.parsingUrls = function(){
    //create html page for each url
    urls.forEach((urlInfo, index, urls)=> {
        var eachPageRequest = request(urlInfo.url).pipe(fs.createWriteStream('drugs/'+ urlInfo.name));
    });
};

app.processDataFiles = function(){
    //parse each html page for the necessary data and add to data array

}


module.exports = app;
