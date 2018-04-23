//this file is programmatically adding elements to index.html page

//datasource for the autocomplete
var availableTags = [];

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
    var drugName = Object.keys(drug).toString().replace(" ","");
    var drugCard = document.createElement("div");
    drugCard.setAttribute("id", drugName);
    drugCard.classList.add("card");
    drugCard.classList.add("col-md-2");
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
    cardInfo.innerHTML = drug.toString();
    cardBody.appendChild(cardInfo);

    var removeButton = document.createElement("button");
    removeButton.classList.add("btn");
    removeButton.classList.add("btn-danger");
    removeButton.classList.add("custom-button-prop");
    removeButton.classList.add("float-right");
    removeButton.innerHTML = "Remove";
    cardBody.appendChild(removeButton);
    removeButton.onclick = function() {
        removeDrug(drugName);
      };
}

$("#search").autocomplete({
    source: availableTags
});

var removeDrug = function(drugName) {
    $("#"+drugName).remove();
}

