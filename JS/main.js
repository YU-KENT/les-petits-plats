
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

    displayRecipes(allRecipes);

    //get all list ingredients/appreils/ustensils
    const ustensilsList = noRepeatArray(ustensilsData)
    const appareilsList = noRepeatArray(appareilsData)
    console.log("appareilsList", appareilsList)
    const ingreArry = getIngredientsList(ingredientsData)
    const ingredientsList = noRepeatArray(ingreArry)
    // display list 
    displayingredientList(ingredientsList);
    displayAppareilsList(appareilsList);
    displayUstensilesList(ustensilsList);

    //search bar
    searchBar.addEventListener('keyup', e => {
        const searchedLetters = cleanUpSpecialChars(e.target.value)
        if (e.target.value.length > 2) {
            if (tagList.length == 0){
            sectionRecipes.innerHTML = "";
            displayRecipes(allRecipes);
            filterSearch(searchedLetters, allRecipes)}
            else{
                sectionRecipes.innerHTML = "";
                displayRecipes(allRecipes);
                for (let i = 0; i < tagList.length; i++) {
                  const restTagLetters = cleanUpSpecialChars(tagList[i]);
                  filterSearch(restTagLetters, allRecipes)
                }
                  filterSearch(searchedLetters,allRecipes)
                }
        } else if (e.target.value == "") {

            if (tagList.length == 0) {
                sectionRecipes.innerHTML = "";
                displayRecipes(allRecipes);
                checkResult();
            } else {
                sectionRecipes.innerHTML = "";
                displayRecipes(allRecipes);
                for (let i = 0; i < tagList.length; i++) {
                    const restTagLetters = cleanUpSpecialChars(tagList[i]);
                    filterSearch(restTagLetters, allRecipes);
                }
            }
        }
    })

    // search ingredients
    champIngredients.addEventListener('keyup', (e) => {
        console.log(searchBar.value)
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

    //seaarch Appareils
    champAppareils.addEventListener('keyup', (e) => {
        console.log(searchBar.value)
        champAppareils.style.width = "223px"
        divApparList.style.height = "unset"
        divApparList.style.display = "flex";
        divApparList.style.flexDirection = "column";

        const AppareilsList = document.querySelectorAll(".appareils-list p");
        console.log("AppareilsList", AppareilsList)
        const searchedLetters = cleanUpSpecialChars(e.target.value);

        if (e.target.value.length > 2) {
            filterChampsList(searchedLetters, AppareilsList)
            creatTag(AppareilsList, allRecipes);
        } else if (e.target.value == "") {
            divApparList.innerHTML = "";
            displayAppareilsList(appareilsList)
        }

    })
    //search ustensiles
    champUstensiles.addEventListener('keyup', (e) => {
        console.log(searchBar.value)
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
    creatTag(ustensilesList, allRecipes);
    creatTag(AppareilsList, allRecipes);
    creatTag(IngredientsList, allRecipes);

}

init();



function displayRecipes(Recipes) {
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


function cleanUpSpecialChars(str) {
    let newStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "").toLowerCase();
    return newStr;
}

// function search 
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

    const recipesVisibleCard = document.querySelectorAll(".recipes_card");
    var restRecipes = [];
    for (let i = 0; i < recipesVisibleCard.length; i++) {
        var dataId = recipesVisibleCard[i].getAttribute("data-id");
        const [rec] = allRecipes.reduce((accumulator, currentValue) => {
            if (currentValue.id == dataId) {
                return [...accumulator, currentValue];
            } return accumulator;
        }, []);
        restRecipes.push(rec);
    }

    const filteredArray = restRecipes.filter(filterRec);
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



// function filtre par mot
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
            const champVal = parentList.parentNode.firstElementChild
            champVal.value = "";
            const listSelected = e.target.textContent;
            const motDeCle = cleanUpSpecialChars(listSelected);
            if (tagList.indexOf(listSelected) == -1) {
                tagFactory(listSelected, e);
                tagList.push(listSelected);
                parentList.style.display = "none";
                filterSearch(motDeCle, allRecipes)
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
    console.log("close", searchBar.value)
    _this.parentNode.remove();
    removeByValue(tagList, tagLetters)
    sectionRecipes.innerHTML = "";
    displayRecipes(allRecipes)
    for (let i = 0; i < tagList.length; i++) {
        const restTagLetters = cleanUpSpecialChars(tagList[i]);
        filterSearch(restTagLetters, allRecipes);
    }
    if (!searchBar.value == "") {
        filterSearch(cleanUpSpecialChars(searchBar.value), allRecipes)
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
    const parentList = _this.parentNode.lastElementChild;
    const arrowDown = _this.nextElementSibling;
    const arrowUp = arrowDown.nextElementSibling;
    parentList.style.display = "grid";
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
    setTimeout(function () {
        const arrowDown = _this.nextElementSibling;
        const arrowUp = arrowDown.nextElementSibling;

        /* if (_this.value == "" ) { */
        const parentList = _this.parentNode.lastElementChild;
        parentList.style.display = "none";
        _this.style.width = '170px',
            cleanListNonvisible();
        arrowDown.style.visibility = "visible";
        arrowUp.style.visibility = "hidden";
        /*   }   */

    }, 100)

}
