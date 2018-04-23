//this is where all the scraping and data file creation happens
var fetch = require('node-fetch');
var cheerio = require('cheerio');
var request = require('request');
var rp = require('request-promise');
var minify = require('html-minifier').minify;
var request_sync = require('sync-request');
var fs = require('fs');
var dataURLs = require('./dataUrls.js');

var dataCollection = {};
var scrapedData = [];

dataCollection.parsingUrls = function(){
    
    //downloading html page for each url
    dataURLs.forEach((urlInfo, index, urls)=> {
        //asnyc
        //var eachPageRequest = request(urlInfo.url).pipe(fs.createWriteStream('drugs/'+ urlInfo.name + ".html"));
       
        //sync
        var eachPageRequest = request_sync('GET',urlInfo.url);
        fs.writeFileSync('drugs/'+ urlInfo.name + ".html",eachPageRequest.getBody().toString());
    });


    //trying to scrape using promises
    // dataCollection.urls.forEach((urlInfo, index, urls)=> {
        
    //     var indexPageRequestOptions = {
    //         uri: urlInfo.url,
    //         transform: function(body){
    //             return cheerio.load(body);
    //         }
    //     };
    
    //     rp(indexPageRequestOptions)
    //         .then(function($){
    //             console.log("processing:"+urlInfo.name);
    //             getData($,urlInfo.name)
    //         })
    //         .catch(function(){
    //             console.log("request-promise failed");
    //         });
    // });

};

dataCollection.processDataFiles = function(){
    //parse each html page for the necessary data and add to data array
    fs.readdirSync('drugs').forEach((file) => {
        if(file[file.length-1] == 'l'){//only get files that end in html
            var drugFile = "";
            var drugName = file.toString().split(".");
            drugFile = fs.readFileSync('drugs/'+file,{encoding: 'utf-8'});
            var drugFileMinified = minify(drugFile,{collapseWhitespace:true});
            getData(drugFileMinified,drugName[0]);
        } 

    })
}

var getData = function(drugFile, drugName){
    
    var $ = cheerio.load(drugFile);
    var section = [];
    var sideEffectColumnsHTML = [];
    var drugSideEffectsColumnHTML;
    var sideEffectName = [];
    var sideEffectPercents = [];

    $('div').each((index,element) => {
        if($(element).hasClass('content-section')){
            section.push($(element).html());
        }
    });
    var sideEffectHTML = section[1];

    $ = cheerio.load(sideEffectHTML);
    $('div').each((index, element)=> {
        if($(element).hasClass('columns')){
            sideEffectColumnsHTML.push($(element).html());
        }
    })    
    drugSideEffectsColumnHTML = sideEffectColumnsHTML[1];
    $ = cheerio.load(drugSideEffectsColumnHTML);
    $('span').each((index,element) => {
        if($(element).attr('itemprop') == "name"){
            sideEffectName.push($(element).text());
        }
    });

    $('li').each((index,element)=>{
        if($(element).hasClass('bar-graph-item')){
            var percentString = $(element).attr('style').split(":");
            sideEffectPercents.push(parseFloat(percentString[1]));
        }
    })
    
 
    var objTmp = {};
    for(var i = 0; i<sideEffectName.length;i++){
        objTmp[sideEffectName[i]] = sideEffectPercents[i];
    }
    var tmpDrugObj = {}
    tmpDrugObj[drugName] = objTmp;
    scrapedData.push(tmpDrugObj);
    writeDataToFile();

};

var writeDataToFile = function(){
    var scrapedDataJSON = JSON.stringify(scrapedData);
    fs.writeFileSync("drugData.js",'var data ='+scrapedDataJSON,"utf8");
    showData(scrapedDataJSON);
}

var showData = function(scrapedDataJSON){
    console.log(scrapedDataJSON);
}
module.exports = dataCollection;
