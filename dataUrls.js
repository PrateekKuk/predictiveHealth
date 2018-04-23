//this is where we store all the urls we're going to scrape
var urls = [
    {name:"Metformin",url:'https://www.patientslikeme.com/treatments/show/221'},
    {name:"Insulin Glargine", url: "https://www.patientslikeme.com/treatments/show/8306"},
    {name:"Gabapentin", url: "https://www.patientslikeme.com/treatments/show/279"},
    {name:"Glipizide", url: "https://www.patientslikeme.com/treatments/show/1456"},
    {name:"Glimepiride", url: "https://www.patientslikeme.com/treatments/show/1420"},
    {name:"Advil", url: "https://www.patientslikeme.com/treatments/show/319"}
]

//note the command below is necessary to indicate what is available to other files from this file
module.exports = urls;
