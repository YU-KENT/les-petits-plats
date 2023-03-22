
const sectionRecipes = document.querySelector(".recipes");
const champIngredients = document.getElementById("search-champs_ingredients");
const champAppareils = document.getElementById("search-champs_appareils");
const champUstensiles = document.getElementById("search-champs_ustensiles");
const divIngreList = document.querySelector(".ingredients-list");
const divApparList = document.querySelector(".appareils-list");
const divUstenList = document.querySelector(".ustensiles-list");
const searchBar = document.getElementById("search-bar");

async function init() {  // function main
    //get data
    const dataApi = new recipesApi("data/recipes.json");
    const allRecipes = await dataApi.getAllData();
    const ingredientsData = await dataApi.getDataIngredients();
    const appareilsData = await dataApi.getDataAppareils();
    const ustensilsData = await dataApi.getDataUstensils();
    // display qll recipes
    displayRecipes(allRecipes);

    //get all list ingredients/appreils/ustensils
    const ustensilsList = noRepeatArray(ustensilsData)
    const appareilsList = noRepeatArray(appareilsData)
    const ingreArry = getIngredientsList(ingredientsData)
    const ingredientsList = noRepeatArray(ingreArry)
    // display list ingredients/appreils/ustensils
    displayingredientList(ingredientsList);
    displayAppareilsList(appareilsList);
    displayUstensilesList(ustensilsList);
    //search bar principal
    searchBar.addEventListener('keyup', e => {
        const searchedLetters = cleanUpSpecialChars(e.target.value)
        if (e.target.value.length > 2) { //if entre plus 2 letters
            if (tagList.length == 0) {  // and if taglist is empty
                sectionRecipes.innerHTML = "";
                displayRecipes(allRecipes);
                filterSearch(searchedLetters, allRecipes)
            }else { // taglist is not empty
                sectionRecipes.innerHTML = "";
                displayRecipes(allRecipes);
                for (let i = 0; i < tagList.length; i++) {
                    const restTagLetters = cleanUpSpecialChars(tagList[i]);
                    filterSearch(restTagLetters, allRecipes)
                }
                filterSearch(searchedLetters, allRecipes)
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
    // search in champ ingredients
    champIngredients.addEventListener('keyup', (e) => {
        champIngredients.style.width = "223px"
        divIngreList.style.height = "unset"
        divIngreList.style.display = "flex"; // get search results
        divIngreList.style.flexDirection = "column";
        const IngredientsList = document.querySelectorAll(".ingredients-list p");
        const searchedLetters = cleanUpSpecialChars(e.target.value);

        if (e.target.value.length > 2) {
            filterChampsList(searchedLetters, IngredientsList)
            creatTag(IngredientsList, allRecipes);
        } else if (e.target.value == "") {
            divIngreList.innerHTML = "";
            displayingredientList(ingredientsList);
        }
    })
    //seaarch in champ Appareils
    champAppareils.addEventListener('keyup', (e) => {
        champAppareils.style.width = "223px"
        divApparList.style.height = "unset"
        divApparList.style.display = "flex";
        divApparList.style.flexDirection = "column";
        const AppareilsList = document.querySelectorAll(".appareils-list p");
        const searchedLetters = cleanUpSpecialChars(e.target.value);

        if (e.target.value.length > 2) {
            filterChampsList(searchedLetters, AppareilsList)
            creatTag(AppareilsList, allRecipes);
        } else if (e.target.value == "") {
            divApparList.innerHTML = "";
            displayAppareilsList(appareilsList)
        }

    })
    //search in champ ustensiles
    champUstensiles.addEventListener('keyup', (e) => {
        champUstensiles.style.width = "223px"
        divUstenList.style.height = "unset"
        divUstenList.style.display = "flex";
        divUstenList.style.flexDirection = "column";
        const ustensilesList = document.querySelectorAll(".ustensiles-list p");
        const searchedLetters = cleanUpSpecialChars(e.target.value);

        if (e.target.value.length > 2) {
            filterChampsList(searchedLetters, ustensilesList);
            creatTag(ustensilesList, allRecipes);
        } else if (e.target.value == "") {
            divUstenList.innerHTML = "";
            displayUstensilesList(ustensilsList);
        }
    })
    
    const ustensilesList = document.querySelectorAll(".ustensiles-list p");
    const IngredientsList = document.querySelectorAll(".ingredients-list p");
    const AppareilsList = document.querySelectorAll(".appareils-list p");
    // click one of those list also will creat a tag
    creatTag(ustensilesList, allRecipes);
    creatTag(AppareilsList, allRecipes);
    creatTag(IngredientsList, allRecipes);
}

init();

// deplace all recipes dans un dom via innerHTML
function displayRecipes(Recipes) {
    sectionRecipes.innerHTML = recipesFactory(Recipes) 
}
// gestion for not have same word in 3 list Ingredients ect.
function noRepeatArray(arrData) { 
    var arr = arrData.flat();
    var newArr = [...new Set(arr)];
    return newArr;
}

// get all Ingredients List from data
function getIngredientsList(ingredientsData) {
    var newList = [];
    ingredientsData.forEach((obj) => {
        for (let i = 0; i < obj.length; i++) {
            const newArry = obj[i].ingredient;
            newList.push(newArry);
        }
    })
    return newList;
}

function cleanUpSpecialChars(str) { //clean special charecter
    let newStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "").toLowerCase();
    return newStr;
}

// function search principal by method "filter"
function filterSearch(Letters, allRecipes) {

    function filterRec(recipe) {
        const arryIngredients = recipe.ingredients.map(obj => { return cleanUpSpecialChars(obj.ingredient) });
        if (arryIngredients.join().includes(Letters)) {
            return true;
        } else if (cleanUpSpecialChars(recipe.name).includes(Letters)) {
            return true;
        } else if (cleanUpSpecialChars(recipe.appliance).includes(Letters)) {
            return true;
        } else if (cleanUpSpecialChars(recipe.ustensils.join()).includes(Letters)) {
            return true;
        } else if (cleanUpSpecialChars(recipe.description).includes(Letters)) {
            return true;
        }
        return false;
    }

    const recipesVisibleCard = document.querySelectorAll(".recipes_card");//get rest recipes
    var restRecipes = []; //creat a array will include the data of rest recipes
    for (let i = 0; i < recipesVisibleCard.length; i++) {
        var dataId = recipesVisibleCard[i].getAttribute("data-id");
        const [rec] = allRecipes.reduce((accumulator, currentValue) => {
            if (currentValue.id == dataId) {
                return [...accumulator, currentValue];
            } return accumulator;
        }, []);
        restRecipes.push(rec);
    }
    const filteredArray = restRecipes.filter(filterRec);// filter reste recipe by letters
    sectionRecipes.innerHTML = "";
    displayRecipes(filteredArray) // display recipes
    checkResult();
}


function checkResult() { //functon check if no recipes find, message error show
    const divSearchbar = document.querySelector(".search");
    const restCard = document.querySelectorAll(".recipes_card");
    if (restCard.length == 0) {
        divSearchbar.setAttribute("data-error", "Vous pouvez chercher «tarte aux pommes », « poisson », etc...");
        divSearchbar.setAttribute("data-error-visible", true);

    }else {
        divSearchbar.removeAttribute("data-error");
        divSearchbar.removeAttribute("data-error-visible");
    }
}

// function filtre the list by letters
function filterChampsList(letters, list) {
    for (let i = 0; i < list.length; i++) {
        if (cleanUpSpecialChars(list[i].textContent).includes(letters)) {
            list[i].classList.remove("nonvisible");
        } else {
            list[i].classList.add("nonvisible");
        }
    }}


function cleanListNonvisible() {
    const nonvisibleList = document.querySelectorAll(".list.nonvisible");
    nonvisibleList.forEach((list) => list.classList.remove("nonvisible"));
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

// function close tag
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

// function remove a value of the taglist
function removeByValue(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
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
    if (!_this.value == "") {
        _this.style.width = "223px"
        parentList.style.width = "223px"
        parentList.style.height = "397px"
        parentList.style.display = "flex"
        parentList.style.flexDirection = "column";
    }


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