
const sectionRecipes = document.querySelector(".recipes")
const champIngredients = document.getElementById("search-champs_ingredients")
const champAppareils = document.getElementById("search-champs_appareils")
const champUstensiles = document.getElementById("search-champs_ustensiles")
const divIngreList = document.querySelector(".ingredients-list")
const divApparList = document.querySelector(".appareils-list")
const divUstenList = document.querySelector(".ustensiles-list")

async function init() {
    //get data
    const dataApi = new recipesApi("data/recipes.json");
    const allRecipes = await dataApi.getAllData();
    const ingredientsData = await dataApi.getDataIngredients();
    const appareilsData = await dataApi.getDataAppareils();
    const ustensilsData = await dataApi.getDataUstensils();

    displayRecipes(allRecipes);
    //get all list ingredients/appreils/ustensils
    const ustensilsList = noRepeatArray(ustensilsData)
    const appareilsList = noRepeatArray(appareilsData)
    const ingreArry = getIngredientsList(ingredientsData)
    const ingredientsList = noRepeatArray(ingreArry)
    // display list 
    displayingredientList(ingredientsList);
    displayAppareilsList(appareilsList);
    displayUstensilesList(ustensilsList);

}
init();
function displayRecipes(Recipes) {
    Recipes.forEach(recipe => {
        const ingredients = recipe.ingredients
        const Template = new recipesFactory(recipe, ingredients);
        sectionRecipes.appendChild(Template.getRecipesCard());
        Template.getIngredientCard(recipe, ingredients);
    })
}

function noRepeatArray(arrData) {
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

//search bar
const searchBar = document.getElementById("search-bar")

searchBar.addEventListener('keyup', e => {
    const searchedLetters = cleanUpSpecialChars(e.target.value)
    if (searchedLetters.length > 2) {
        filterSearch(searchedLetters)
    } else if (e.target.value == "") {
        cleanCardNonvisible();
        checkResult();
    }
})

function filterSearch(letters) {
    const recipesCard = document.querySelectorAll(".recipes_card:not(.nonvisible)")

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


// function filtre par mot
function filterChamps(letters, list) {

    for (let i = 0; i < list.length; i++) {
        if (cleanUpSpecialChars(list[i].textContent).includes(letters)) {
            list[i].classList.remove("nonvisible")

        } else {
            list[i].classList.add("nonvisible")
        }
    }
}
// search ingredients
champIngredients.addEventListener('keyup', (e) => {
    const IngredientsList = document.querySelectorAll(".ingredients-list p")
    const searchedLetters = cleanUpSpecialChars(e.target.value)

    if (e.target.value.length > 2) {
        filterChamps(searchedLetters, IngredientsList)
        divIngreList.style.display = "flex"; // montrer le resultat de recherche
        divIngreList.style.flexDirection = "column";
        creatTag(IngredientsList)

    }
})

//seaarch Appareils
champAppareils.addEventListener('keyup', (e) => {
    const AppareilsList = document.querySelectorAll(".appareils-list p")
    const searchedLetters = cleanUpSpecialChars(e.target.value)

    if (e.target.value.length > 2) {
        filterChamps(searchedLetters, AppareilsList)
        divApparList.style.display = "flex"; // montrer le resultat de recherche
        divApparList.style.flexDirection = "column";
        creatTag(AppareilsList)
    }

})
//search ustensiles
champUstensiles.addEventListener('keyup', (e) => {
    const ustensilesList = document.querySelectorAll(".ustensiles-list p")
    const searchedLetters = cleanUpSpecialChars(e.target.value)

    if (e.target.value.length > 2) {
        filterChamps(searchedLetters, ustensilesList)
        divUstenList.style.display = "flex"; // montrer le resultat de recherche
        divUstenList.style.flexDirection = "column";
        creatTag(ustensilesList)
    }

})


function cleanListNonvisible() {
    const nonvisibleList = document.querySelectorAll(".list.nonvisible")
    nonvisibleList.forEach((list) => list.classList.remove("nonvisible"))
}
function cleanCardNonvisible() {
    const nonvisibleCard = document.querySelectorAll(".recipes_card.nonvisible")
    nonvisibleCard.forEach((list) => list.classList.remove("nonvisible"))
}

//creat Tag
var tagList = []; // un tag list
function creatTag(lists) {
    const parentList = lists[0].parentNode
    for (let i = 0; i < lists.length; i++) {
        lists[i].addEventListener("click", (e) => {
            const listSelected = e.target.textContent
            const motDeCle = cleanUpSpecialChars(listSelected)
            if (tagList.indexOf(listSelected) == -1) {
                tagFactory(listSelected, e);
                tagList.push(listSelected);
                parentList.style.display = "none";
                cleanListNonvisible();
                filterSearch(motDeCle)
            }
            else return

        })
    }
}
// close tag
function closeTag(_this) {
    const tagLetters = _this.previousElementSibling.textContent
    _this.parentNode.remove();
    removeByValue(tagList, tagLetters)
    cleanCardNonvisible();
    for (let i = 0; i < tagList.length; i++) {
        const restTagLetters = tagList[i].toLowerCase().replace(/\s/g, "")
        filterSearch(restTagLetters)
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
        const parentList = _this.parentNode.lastElementChild
        parentList.style.display = "none";
        _this.style.width = '170px',
            cleanListNonvisible();
        arrowDown.style.visibility = "visible";
        arrowUp.style.visibility = "hidden";
    }

}

