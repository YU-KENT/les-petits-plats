//dom eles
const sectionRecipes = document.querySelector(".recipes");
const champIngredients = document.getElementById("search-champs_ingredients");
const champAppareils = document.getElementById("search-champs_appareils");
const champUstensiles = document.getElementById("search-champs_ustensiles");
const divIngreList = document.querySelector(".ingredients-list");
const divApparList = document.querySelector(".appareils-list");
const divUstenList = document.querySelector(".ustensiles-list");
const searchBar = document.getElementById("search-bar");

async function init() {
    //get data
    const dataApi = new recipesApi("data/recipes.json");
    const allRecipes = await dataApi.getAllData();
    const ingredientsData = await dataApi.getDataIngredients();
    const appareilsData = await dataApi.getDataAppareils();
    const ustensilsData = await dataApi.getDataUstensils();
    //display all recipes
    displayRecipes(allRecipes);

    //get all list ingredients/appreils/ustensils
    const ustensilsList = noRepeatArray(ustensilsData);
    const appareilsList = noRepeatArray(appareilsData);
    const ingreArry = getIngredientsList(ingredientsData);
    const ingredientsList = noRepeatArray(ingreArry);

    // display 3 list
    displayingredientList(ingredientsList);
    displayAppareilsList(appareilsList);
    displayUstensilesList(ustensilsList);

    //function search bar
    searchBar.addEventListener('keyup', e => {
        const searchedLetters = cleanUpSpecialChars(e.target.value)
        if (searchedLetters.length > 2) { // when user enters more than 2 letters
            filterSearch(searchedLetters, allRecipes)// run function search
        } else if (e.target.value == "") { // if search bar is empty, display all recipes
            sectionRecipes.innerHTML = "";
            displayRecipes(allRecipes);
            checkResult();
        }
    })

    // search ingredient in list ingredients
    champIngredients.addEventListener('keyup', (e) => {
        const IngredientsList = document.querySelectorAll(".ingredients-list p");
        const searchedLetters = cleanUpSpecialChars(e.target.value);

        if (e.target.value.length > 2) {
            filterChampsList(searchedLetters, IngredientsList)
            divIngreList.style.display = "flex"; // get a list results 
            divIngreList.style.flexDirection = "column";
            creatTag(IngredientsList, allRecipes); // creat tag

        }
    })

    //seaarch Appareils
    champAppareils.addEventListener('keyup', (e) => {
        const AppareilsList = document.querySelectorAll(".appareils-list p");
        const searchedLetters = cleanUpSpecialChars(e.target.value);

        if (e.target.value.length > 2) {
            filterChampsList(searchedLetters, AppareilsList)
            divApparList.style.display = "flex"; // get a list results 
            divApparList.style.flexDirection = "column";
            creatTag(AppareilsList, allRecipes);
        }

    })
    //search ustensiles
    champUstensiles.addEventListener('keyup', (e) => {
        const ustensilesList = document.querySelectorAll(".ustensiles-list p");
        const searchedLetters = cleanUpSpecialChars(e.target.value);

        if (e.target.value.length > 2) {
            filterChampsList(searchedLetters, ustensilesList);
            divUstenList.style.display = "flex"; // get a list results 
            divUstenList.style.flexDirection = "column";

            creatTag(ustensilesList, allRecipes);
        }
    })
}

init();


function displayRecipes(Recipes) { // function display recipes
    Recipes.forEach(recipe => {
        const ingredients = recipe.ingredients;
        const Template = new recipesFactory(recipe, ingredients);
        sectionRecipes.appendChild(Template.getRecipesCard());
        Template.getIngredientCard(recipe, ingredients);
    })
}

function noRepeatArray(arrData) {
    var arr = arrData.flat();
    var newArr = [...new Set(arr)];
    return newArr;
}

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

// 

function cleanUpSpecialChars(str){
let newStr =  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "").toLowerCase();
return newStr;
}
 
// function main search 
function filterSearch(Letters, allRecipes) {
    function filterRec(recipe) { //filter all data receipes with letters
        const arryIngredients = recipe.ingredients.map(obj => { return cleanUpSpecialChars(obj.ingredient)});
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

    const recipesVisibleCard = document.querySelectorAll(".recipes_card");// get all availables recipes
    var restRecipes = []; // creat a data array with all availables recipes
    for (let i = 0; i < recipesVisibleCard.length; i++) {
        var dataId = recipesVisibleCard[i].getAttribute("data-id");// get data-id, find data
        const [rec] = allRecipes.reduce((accumulator, currentValue) => {
            if (currentValue.id == dataId) {
                return [...accumulator, currentValue];
            } return accumulator;
        }, []);
        restRecipes.push(rec);//push data into the array
    }

    const filteredArray = restRecipes.filter(filterRec); // search in availables data array
    sectionRecipes.innerHTML = "";
    console.log("filteredArray", filteredArray)
    displayRecipes(filteredArray)
    checkResult();
}


function checkResult() { //Aucune recette correspondante à la recherche,message error
    const divSearchbar = document.querySelector(".search");
    const restCard = document.querySelectorAll(".recipes_card");

    if (restCard.length == 0) {
        divSearchbar.setAttribute("data-error", "Vous pouvez chercher «tarte aux pommes », « poisson », etc...");
        divSearchbar.setAttribute("data-error-visible", true);
    }
    else {
        divSearchbar.removeAttribute("data-error");
        divSearchbar.removeAttribute("data-error-visible");
    }
}



// function filter the list by letters
function filterChampsList(letters, list) {
    for (let i = 0; i < list.length; i++) {
        if (cleanUpSpecialChars(list[i].textContent).includes(letters)) {
            list[i].classList.remove("nonvisible");

        } else {
            list[i].classList.add("nonvisible");
        }
    }
}


function cleanListNonvisible() {
    const nonvisibleList = document.querySelectorAll(".list.nonvisible");
    nonvisibleList.forEach((list) => list.classList.remove("nonvisible"));
}

//creat Tag
var tagList = []; //  tag list
function creatTag(lists, allRecipes) {
    const parentList = lists[0].parentNode;

    for (let i = 0; i < lists.length; i++) {
        lists[i].addEventListener("click", (e) => {

            const listSelected = e.target.textContent;
            const motDeCle = cleanUpSpecialChars(listSelected);
            if (tagList.indexOf(listSelected) == -1) { //if key word not exist in tag list
                tagFactory(listSelected, e);// creat a tag with this key word
                tagList.push(listSelected); // push key word in tag list
                parentList.style.display = "none";

                filterSearch(motDeCle, allRecipes) // run function search
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
    _this.parentNode.remove(); // surpprimer tag
    removeByValue(tagList, tagLetters) // surpprimer this tag in tag list
    sectionRecipes.innerHTML = "";// empty the section recipes
    displayRecipes(allRecipes)// display all recipes

    for (let i = 0; i < tagList.length; i++) { // run function search
        const restTagLetters = cleanUpSpecialChars(tagList[i]);
        filterSearch(restTagLetters, allRecipes);
    }

}

// remove a value of the taglist
function removeByValue(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
            arr.splice(i, 1);
            break;
        }
    }
}

function changeArrow(_this) {
    const arrowDown = _this.nextElementSibling;
    const arrowUp = arrowDown.nextElementSibling;
    arrowDown.style.visibility = "hidden";
    arrowUp.style.visibility = "visible";
}

function gestionListApresBlur(_this) {
    const arrowDown = _this.nextElementSibling;
    const arrowUp = arrowDown.nextElementSibling;
    if (_this.value == "") {
        const parentList = _this.parentNode.lastElementChild;
        parentList.style.display = "none";
        _this.style.width = '170px',
        cleanListNonvisible();
        arrowDown.style.visibility = "visible";
        arrowUp.style.visibility = "hidden";
    }

}


