
const sectionRecipes = document.querySelector(".recipes")
const champIngredients = document.getElementById("search-champs_ingredients")
const champAppareils = document.getElementById("search-champs_appareils")
const champUstensiles = document.getElementById("search-champs_ustensiles")
const divIngreList = document.querySelector(".ingredients-list")
const divApparList = document.querySelector(".appareils-list")
const divUstenList = document.querySelector(".ustensiles-list")
const searchBar = document.getElementById("search-bar")

async function init() {
    //get data
    const dataApi = new recipesApi("data/recipes.json");
    const allRecipes = await dataApi.getAllData();
    const ingredientsData = await dataApi.getDataIngredients();
    const appareilsData = await dataApi.getDataAppareils();
    const ustensilsData = await dataApi.getDataUstensils();

    displayRecipes(allRecipes);
    //get all list ingredients/appreils/ustensils
    const usList = noRepeatArray(ustensilsData)
    const appList = noRepeatArray(appareilsData)
    const ingreArry = getIngredientsList(ingredientsData)
    const ingreList = noRepeatArray(ingreArry)
    // display list 
    displayingredientList(ingreList);
    displayAppareilsList(appList);
    displayUstensilesList(usList);
    // click one of those list also will creat a tag
    const ustensilesList = document.querySelectorAll(".ustensiles-list p");
    const IngredientsList = document.querySelectorAll(".ingredients-list p");
    const AppareilsList = document.querySelectorAll(".appareils-list p");
    creatTag(ustensilesList);
    creatTag(IngredientsList);
    creatTag(AppareilsList);
    //function search bar
const searchBar = document.getElementById("search-bar")

searchBar.addEventListener('keyup', e => {
    const searchedLetters = cleanUpSpecialChars(e.target.value)
    if (e.target.value.length > 2) { //if entre plus 2 letters
        if (tagList.length == 0) {  // and if taglist is empty
            sectionRecipes.innerHTML = "";
            displayRecipes(allRecipes);
            filterSearch(searchedLetters)
        } else { // taglist is not empty
            sectionRecipes.innerHTML = "";
            displayRecipes(allRecipes);
            for (let i = 0; i < tagList.length; i++) {
                const restTagLetters = cleanUpSpecialChars(tagList[i]);
                filterSearch(restTagLetters)
            }
            filterSearch(searchedLetters)
        }
    } else if (e.target.value == "") { // if search bar is empty
        if (tagList.length == 0) { //and if taglist is empty
            sectionRecipes.innerHTML = "";
            displayRecipes(allRecipes);

        } else { //search bar is empty, taglist is not empty
            sectionRecipes.innerHTML = "";
            displayRecipes(allRecipes);
            for (let i = 0; i < tagList.length; i++) {
                const restTagLetters = cleanUpSpecialChars(tagList[i]);
                filterSearch(restTagLetters, allRecipes);
            }
        }
    }
})

// search the ingredient in list ingredient
champIngredients.addEventListener('keyup', (e) => {
    champIngredients.style.width = "223px"
    divIngreList.style.height = "unset"
    divIngreList.style.display = "flex";
    divIngreList.style.flexDirection = "column";
    const IngredientsList = document.querySelectorAll(".ingredients-list p")
    const searchedLetters = cleanUpSpecialChars(e.target.value)

    if (e.target.value.length > 2) {
        filterChamps(searchedLetters, IngredientsList)
        creatTag(IngredientsList) // creat tag
    }
})

//seaarch the Appareil in list Appareils
champAppareils.addEventListener('keyup', (e) => {
    const AppareilsList = document.querySelectorAll(".appareils-list p")
    const searchedLetters = cleanUpSpecialChars(e.target.value)
    champAppareils.style.width = "223px"
    divApparList.style.height = "unset"
    divApparList.style.display = "flex";
    divApparList.style.flexDirection = "column";
    if (e.target.value.length > 2) {
        filterChamps(searchedLetters, AppareilsList)
        creatTag(AppareilsList)
    }

})
//search ustensile in list ustensiles
champUstensiles.addEventListener('keyup', (e) => {
    const ustensilesList = document.querySelectorAll(".ustensiles-list p")
    const searchedLetters = cleanUpSpecialChars(e.target.value)
    champUstensiles.style.width = "223px"
    divUstenList.style.height = "unset"
    divUstenList.style.display = "flex";
    divUstenList.style.flexDirection = "column";
    if (e.target.value.length > 2) {
        filterChamps(searchedLetters, ustensilesList)
        creatTag(ustensilesList)
    }
})

}
init();

// deplace all recipes dans un dom via innerHTML
function displayRecipes(Recipes) {
    sectionRecipes.innerHTML = recipesFactory(Recipes)
}

function noRepeatArray(arrData) { //get 1D array
    var arr = arrData.flat();
    var newArr = [...new Set(arr)];
    return newArr

}

function getIngredientsList(ingredientsData) {
    var newList = [];
    ingredientsData.forEach((obj) => {
        for (let i = 0; i < obj.length; i++) {
            const newArry = obj[i].ingredient
            newList.push(newArry)
        }
    })
    return newList;

}


function cleanUpSpecialChars(str) {
    let newStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "").toLowerCase();
    return newStr;
}

function filterSearch(letters) {
    const recipesCard = document.querySelectorAll(".recipes_card:not(.nonvisible)")//get availables recipes

    for (let i = 0; i < recipesCard.length; i++) {
        if (cleanUpSpecialChars(recipesCard[i].textContent).includes(letters)) {
            recipesCard[i].classList.remove("nonvisible")
        } else {
            recipesCard[i].classList.add("nonvisible")
        }
    }
    checkResult();

}

function checkResult() { //Aucune recette correspondante à la recherche,message error
    const divSearchbar = document.querySelector(".search")
    const restCard = document.querySelectorAll(".recipes_card:not(.nonvisible)")

    if (restCard.length == 0) {
        divSearchbar.setAttribute("data-error", "Vous pouvez chercher «tarte aux pommes », « poisson », etc...");
        divSearchbar.setAttribute("data-error-visible", true)
    }
    else {
        divSearchbar.removeAttribute("data-error");
        divSearchbar.removeAttribute("data-error-visible")
    }
}


// function find the key word in 3 lists
function filterChamps(letters, list) {

    for (let i = 0; i < list.length; i++) {
        if (cleanUpSpecialChars(list[i].textContent).includes(letters)) {
            list[i].classList.remove("nonvisible")

        } else {
            list[i].classList.add("nonvisible")
        }
    }
}


function cleanListNonvisible() {
    const nonvisibleList = document.querySelectorAll(".list.nonvisible")
    nonvisibleList.forEach((list) => list.classList.remove("nonvisible"))
}
function cleanCardNonvisible() {
    const nonvisibleCard = document.querySelectorAll(".recipes_card.nonvisible")
    nonvisibleCard.forEach((list) => list.classList.remove("nonvisible"))
}

// function creat Tag
var tagList = []; //  tag list
function creatTag(lists, allRecipes) {
    const parentList = lists[0].parentNode;
    for (let i = 0; i < lists.length; i++) { // for all list if clicked
        lists[i].addEventListener("click", (e) => {
            e.preventDefault()
            const champVal = parentList.parentNode.firstElementChild // input champ
            champVal.value = ""; //vide value of input
            const listSelected = e.target.textContent; // get value clicked
            const motDeCle = cleanUpSpecialChars(listSelected);
            if (tagList.indexOf(listSelected) == -1) {  // if value clicked not exists in taglist
                tagFactory(listSelected, e);  //creat tag
                tagList.push(listSelected);  // add value in taglist
                parentList.style.display = "none";  // close list
                filterSearch(motDeCle, allRecipes) // do the search 
            }
            else return
        })
    }
}

// close tag
async function closeTag(_this) {
    const dataApi = new recipesApi("data/recipes.json");
    const allRecipes = await dataApi.getAllData();
    const tagLetters = _this.previousElementSibling.textContent
    _this.parentNode.remove(); // remove the tag
    removeByValue(tagList, tagLetters) //remove clicked letters in tag list
    sectionRecipes.innerHTML = "";
    displayRecipes(allRecipes)
    for (let i = 0; i < tagList.length; i++) { // search de rest letters in tag list
        const restTagLetters = cleanUpSpecialChars(tagList[i]);
        filterSearch(restTagLetters, allRecipes);
    }
    if (!searchBar.value == "") {
        filterSearch(cleanUpSpecialChars(searchBar.value), allRecipes)
    }

}
// remove un value dans taglist
function removeByValue(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}

function changeArrow(_this) { // function onfocus
    const parentList = _this.parentNode.lastElementChild;
    const arrowDown = _this.nextElementSibling;
    const arrowUp = arrowDown.nextElementSibling;
    parentList.style.display = "grid";
    parentList.style.width = "unset"
    parentList.style.height = "397px"
    arrowDown.style.visibility = "hidden";
    arrowUp.style.visibility = "visible";
}

function gestionListApresBlur(_this) {
    const arrowDown = _this.nextElementSibling;
    const arrowUp = arrowDown.nextElementSibling;
    const parentList = _this.parentNode.lastElementChild;
    arrowDown.style.visibility = "visible";
    arrowUp.style.visibility = "hidden";
    _this.style.width = '170px',
        setTimeout(function () {  //avoid onblur function run before creat tag
            parentList.style.display = "none";
            cleanListNonvisible()
        }, 150)
    }