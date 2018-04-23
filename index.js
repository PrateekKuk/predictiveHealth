//this file is programmatically adding elements to index.html page

//datasource for the autocomplete
var availableTags = [];

var addPageElements = function(){
    console.log(data);
    makeDrugCard();
}

var makeDrugCard = function(){
    
    var drugDiv = document.getElementById("drugs-container");
    
    for(var i = 0; i < data.length;i++){
        var drugCard = document.createElement("div");
        drugCard.setAttribute("id", Object.keys(data[i]).toString().replace(" ",""));
        availableTags.push(Object.keys(data[i]).toString());
        drugCard.classList.add("card");
        drugCard.classList.add("custom-card");      
        drugDiv.appendChild(drugCard);

        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        drugCard.appendChild(cardBody);

        var cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerHTML = Object.keys(data[i]).toString();
        cardBody.appendChild(cardTitle);

        var cardInfo = document.createElement("p");
        cardInfo.classList.add("card-text");
        cardInfo.innerHTML = data[i].toString();
        cardBody.appendChild(cardInfo);

        var selectButton = document.createElement("a");
        selectButton.classList.add("btn");
        selectButton.classList.add("custom-button-prop");
        selectButton.classList.add("float-right");
        selectButton.innerHTML = "Add to Regimen";
        cardBody.appendChild(selectButton);
    }

}

$("#search").autocomplete({
    source: availableTags
});