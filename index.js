//this file is programmatically adding elements to index.html page

//datasource for the autocomplete
var availableTags = [];
var sideEffects = [];
var sideEffectCount = {};

var dataPrep = function(){
    console.log(data);
    for(var i = 0; i < data.length;i++){
        availableTags.push(Object.keys(data[i]).toString());
    }
}
var addButtonClicked = function(){
    var searchBox = document.getElementById("search");
    var drugName = searchBox.value;
    console.log(drugName);
    var drug = getDrug(drugName);
    console.log(drug);
    makeDrugCard(drug);
    var drugDiv = document.getElementById("drugs-container");
    drugDiv.classList.remove("hide");
    getAllSideEffects(drug);
}
var getDrug = function(drugName){
    var drugNameClean = drugName.toLowerCase().replace(" ","");
    for(var i = 0; i < data.length;i++){
        if(drugNameClean == Object.keys(data[i]).toString().replace(" ","").toLowerCase()){
            return data[i];
        }
    }
}
var makeDrugCard = function(drug){
    
    var drugDiv = document.getElementById("drugs-body");
    var drugNameWithSpace = Object.keys(drug).toString();
    var drugNameNoSpace = Object.keys(drug).toString().replace(" ","");
    var drugCard = document.createElement("div");
    drugCard.setAttribute("id", drugNameNoSpace);
    drugCard.classList.add("card");
    drugCard.classList.add("col-md-4");
    drugCard.classList.add("custom-card");      
    drugDiv.appendChild(drugCard);

    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    drugCard.appendChild(cardBody);

    var cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = Object.keys(drug).toString();
    cardBody.appendChild(cardTitle);

    var cardInfo = document.createElement("p");
    cardInfo.classList.add("card-text");
    // var sideEffectsObj = drug[drugNameWithSpace];
    // var sideEffectsList = Object.keys(sideEffectsObj).toString();
    var sideEffectsList = getSideEffectsForDrug(drug);
    console.log(sideEffectsList);
    cardInfo.innerHTML = "Side Effects:" + "</br>" + sideEffectsList;
    cardBody.appendChild(cardInfo);

    var removeButton = document.createElement("button");
    removeButton.classList.add("btn");
    removeButton.classList.add("btn-danger");
    removeButton.classList.add("custom-button-prop");
    removeButton.classList.add("float-right");
    removeButton.innerHTML = "Remove";
    cardBody.appendChild(removeButton);
    removeButton.onclick = function() {
        removeDrug(drug,drugNameNoSpace);
    };
}

$("#search").autocomplete({
    source: availableTags
});

var removeDrug = function(drug,drugName) {
    $("#"+drugName).remove();
    var drugDiv = document.getElementById("drugs-body");
    if(drugDiv.childElementCount == 0){
        var drugDiv = document.getElementById("drugs-container");
        drugDiv.classList.add("hide");
    }
    removeSideEffectsFromCount(drug);
}
var getSideEffectsForDrug = function(drug){
    var drugNameWithSpace = Object.keys(drug).toString();
    var drugSideEffects = Object.keys(drug[drugNameWithSpace]);
    var returnEffects = [];
    for(var j = 0; j<drugSideEffects.length; j++){
        if(!sideEffects[drugSideEffects[j]]){
            returnEffects.push(drugSideEffects[j]);
        }
    }
    return returnEffects;
}
var getAllSideEffects = function(drug){
    
    var drugNameWithSpace = Object.keys(drug).toString();
    var drugSideEffects = Object.keys(drug[drugNameWithSpace]);
    for(var j = 0; j<drugSideEffects.length; j++){
        if(!sideEffects[drugSideEffects[j]]){
            if(drugSideEffects[j] in sideEffectCount){
                sideEffectCount[drugSideEffects[j]] += 1;

            }else{
                sideEffectCount[drugSideEffects[j]] = 1;

            }
        }
    }
    console.log(sideEffectCount);
}

var removeSideEffectsFromCount = function(drug){
    var drugSideEffects = getSideEffectsForDrug(drug);
    for(var j = 0; j<drugSideEffects.length; j++){
        if(drugSideEffects[j] in sideEffectCount){
            sideEffectCount[drugSideEffects[j]] -= 1;

        }
    }
    console.log(sideEffectCount);
}


