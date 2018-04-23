var fetch = require('node-fetch');
var cheerio = require('cheerio');
var request = require('request');
var rp = require('request-promise');
var minify = require('html-minifier').minify;
var request_sync = require('sync-request');
var fs = require('fs');
var app = {};
var scrapedData = {};
var urls = [];
urls.push({name:"metformin",url:'https://www.patientslikeme.com/treatments/show/221'}); 
urls.push({name:"Insulin Glargine", url: "https://www.patientslikeme.com/treatments/show/8306"});


app.parsingUrls = function(){
    //create html page for each url
    urls.forEach((urlInfo, index, urls)=> {
        var eachPageRequest = request(urlInfo.url).pipe(fs.createWriteStream('drugs/'+ urlInfo.name + ".html"));
    });
};

app.processDataFiles = function(){
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
    
    $('div[id="overview"]').find('article > div > div').each(function (index, element) {
        section.push($(element).text());
    });
    var sideEffectObj = {};
    var cleanSideEffectList = []; 
    var patientNumber;
    var sideEffectString = section[4].toString();
    var sideEffectlist = sideEffectString.split(":");
    sideEffectlist.forEach((curr,index,all) =>{
        //curr.replace(//g,"");
        if(index > 4){
            cleanSideEffectList.push(curr.slice(0,-28));
        }
    });
    cleanSideEffectList.forEach((curr,index,all) => {
        var patientNumberRepeated = curr.match(/\d+/)[0];
        patientNumber = patientNumberRepeated.slice(0,(patientNumberRepeated.length/2));
        var numberIndex = curr.indexOf(patientNumberRepeated);
        cleanSideEffectList[index] = curr.slice(0,numberIndex);
        sideEffectObj[cleanSideEffectList[index]] = patientNumber;
    })
    //console.log(cleanSideEffectList);
    var showIndex = cleanSideEffectList[cleanSideEffectList.length-1].indexOf("Show");
    cleanSideEffectList[cleanSideEffectList.length-1] = cleanSideEffectList[cleanSideEffectList.length-1].slice(0,showIndex)
    
    //scrapedData.push([drugName]); //= sideEffectObj;
    scrapedData[drugName] = sideEffectObj;
};

app.showData = function(){
    console.log(JSON.stringify(scrapedData));
}

module.exports = app;
