//this file is where all the data science logic happens

//datasource for the autocomplete
var availableTags = [];
var sideEffects = [];
var sideEffectCount = {};
var regimenDrugs = [];
var sideEffectPercents = {};
var sideEffectProbabilities = {};

var dataPrep = function(){
    console.log(data);
    for(var i = 0; i < data.length;i++){
        availableTags.push(Object.keys(data[i]).toString());
    }
}
var addButtonClicked = function(){
    var searchBox = document.getElementById("search");
    var drugName = searchBox.value;
    if(drugName != ""){
        var drug = getDrug(drugName);
        console.log(drug);
        for(var i = 0; i < regimenDrugs.length; i++){
            if(Object.keys(regimenDrugs[i]).toString() == drugName){
                return;
            }
        }
        makeDrugCard(drug);
        var drugDiv = document.getElementById("drugs-container");
        drugDiv.classList.remove("hide");
        getAllSideEffects(drug,drugName);
        regimenDrugs.push(drug);
        calculateProbability();
        updateSideEffectsDiv(drug, drugName);

    }

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
    var drugNameNoSpace = Object.keys(drug).toString().replace(/\s/g,"");
    var drugCard = document.createElement("div");
    drugCard.setAttribute("id", drugNameNoSpace);
    drugCard.classList.add("card");
    drugCard.classList.add("col-sm-3");
    drugCard.classList.add("custom-card");      
    drugDiv.appendChild(drugCard);

    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    drugCard.appendChild(cardBody);

    var cardTitle = document.createElement("span");
    cardTitle.classList.add("card-text");
    cardTitle.innerHTML = Object.keys(drug).toString();
    cardBody.appendChild(cardTitle);

    // var cardInfo = document.createElement("p");
    // cardInfo.classList.add("card-text");
    // // var sideEffectsObj = drug[drugNameWithSpace];
    // // var sideEffectsList = Object.keys(sideEffectsObj).toString();
    // var sideEffectsList = getSideEffectsForDrug(drug);
    // cardInfo.innerHTML = "Side Effects:" + "</br>" + sideEffectsList;
    //cardBody.appendChild(cardInfo);

    var removeButton = document.createElement("button");
    removeButton.classList.add("btn");
    removeButton.classList.add("custom-button-prop");
    removeButton.classList.add("float-right");
    removeButton.innerHTML = '<i class="fas fa-minus"></i>';
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
    for(var i = 0; i< regimenDrugs.length; i++){
        if(Object.keys(regimenDrugs[i]).toString() == Object.keys(drug).toString() ){
            regimenDrugs.splice(i,1);
        }
    }
    removeSideEffectsFromCount(drug, drugName);
    calculateProbability();
    updateSideEffectsDiv(drug,drugName);
    var drugDiv = document.getElementById("drugs-body");
    if(drugDiv.childElementCount == 0){
        var drugCont = document.getElementById("drugs-container");
        drugCont.classList.add("hide");

        var resultsDiv = document.getElementById("results-container");
        resultsDiv.classList.add("hide");
    }
}
//use this to get the side-effects for a drug
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

//function that updates the global side effects count and percents
var getAllSideEffects = function(drug, drugName){
    
    var drugNameWithSpace = Object.keys(drug).toString();
    var drugSideEffects = Object.keys(drug[drugNameWithSpace]);
    for(var j = 0; j<drugSideEffects.length; j++){
        if(!sideEffects[drugSideEffects[j]]){
            var holderArray = [];
            if(drugSideEffects[j] in sideEffectCount){
                sideEffectCount[drugSideEffects[j]] += 1;

                var tmpObjPercent = {};
                tmpObjPercent[drugName] = drug[drugName][drugSideEffects[j]];
                sideEffectPercents[drugSideEffects[j]].push(tmpObjPercent);
            }else{
                sideEffectCount[drugSideEffects[j]] = 1;

                var tmpObjPercent = {};
                tmpObjPercent[drugName] = drug[drugName][drugSideEffects[j]];
                holderArray.push(tmpObjPercent);
                sideEffectPercents[drugSideEffects[j]] = holderArray;
            }
        }
    }
    console.log(sideEffectCount);
}

//this updates side-effect count and percents
var removeSideEffectsFromCount = function(drug,drugName){
    var drugSideEffects = getSideEffectsForDrug(drug);
    for(var j = 0; j<drugSideEffects.length; j++){
        if(drugSideEffects[j] in sideEffectCount){
            sideEffectCount[drugSideEffects[j]] -= 1;
            
            
            var drugArray = sideEffectPercents[drugSideEffects[j]];
            for(var k = 0; k < drugArray.length; k++){
                if(Object.keys(drugArray[k]).toString() == Object.keys(drug).toString()){
                    drugArray.splice(k,1);
                }
            }
            if(drugArray.length == 0){
                delete sideEffectPercents[drugSideEffects[j]];
            }
        }   
    }
    console.log(sideEffectCount);
    updateSideEffectsDiv(drug,drugName);
}

var calculateProbability = function(){
    var sideEffects = Object.keys(sideEffectPercents);
    sideEffectProbabilities = {};
    
    for(var i = 0; i < sideEffects.length; i++){
        var sideEffectHolder = sideEffectPercents[sideEffects[i]];
        var probValue;
        if(sideEffectHolder.length == 1){
            var sideEffectDrugObj = sideEffectHolder[0];
            probValue = sideEffectDrugObj[Object.keys(sideEffectDrugObj)];
            sideEffectProbabilities[sideEffects[i]] = probValue;
        }
        else{
            var tempProbHolder = []
            var probSum = 0;
            var totalProduct = 1;
            var finalProb;
            var unionProds = 0;
            var sign;
            if(sideEffectHolder.length%2 == 0){
                sign = "even";
            }else{
                sign = "odd";
            }
            //going to populate all the prob in tempProbHolder for this sideEffect
            for(var j = 0; j < sideEffectHolder.length; j++){
                var sideEffectDrugObj2 = sideEffectHolder[j];
                tempProbHolder.push((sideEffectDrugObj2[Object.keys(sideEffectDrugObj2)])/100);
            }
            //now that all probs are in tempProbHolder, we can apply formula
            //P(E_A ∪ E_B) = P(E_A)+P(E_B)- P(E_A ∩ E_B)
            //P(E_A ∩ E_B) = P(E_A)P(E_B). 
            for(var k = 0; k < tempProbHolder.length;k++){
                probSum += tempProbHolder[k];
                totalProduct = totalProduct * tempProbHolder[k];
                if(k+1 < tempProbHolder.length){
                    for(var l = k; l<= tempProbHolder.length-(k+1); l++){
                        if(l+1 < tempProbHolder.length){
                            unionProds = unionProds + (tempProbHolder[l+1]*tempProbHolder[k]);
                        }
                    }
                }
            }
            if(sign == "even"){
                if(tempProbHolder.length == 2){
                    finalProb = probSum - totalProduct;
                }else{
                    finalProb = probSum - unionProds - totalProduct;
                }
            }else{
                finalProb = probSum - unionProds + totalProduct;
            }
            sideEffectProbabilities[sideEffects[i]] = finalProb*100;
        }
        
    }

}

var updateSideEffectsDiv = function(drug, drugName){
    var sideEffectListDiv = document.getElementById("regimen-side-effects");
    sideEffectListDiv.innerHTML = "";

    var resultsDiv = document.getElementById("results-container");
    resultsDiv.classList.remove("hide");

    var rowSpace = document.createElement("div");
    rowSpace.classList.add("row");
    sideEffectListDiv.appendChild(rowSpace);
    var allSideEffects = Object.keys(sideEffectCount);

    for(var i=0;i<allSideEffects.length;i++){
        if(sideEffectCount[allSideEffects[i]] != 0){
            var effectDiv = document.createElement("div");
            effectDiv.classList.add("card");
            // effectDiv.classList.add("custom-card");
            effectDiv.classList.add("col-lg-2");
            rowSpace.appendChild(effectDiv);
            var sideEffectProbDisplay = sideEffectProbabilities[allSideEffects[i]];
            var effectDivbody = document.createElement("div");
            effectDivbody.classList.add("card-body");
            effectDivbody.innerHTML = "";
            effectDivbody.innerHTML = allSideEffects[i] + sideEffectProbDisplay;
            effectDiv.appendChild(effectDivbody);
            //sideEffectListDiv.innerHTML += allSideEffects[i];
            
        }else{
            delete sideEffectCount[allSideEffects[i]];
        }
    }
}
