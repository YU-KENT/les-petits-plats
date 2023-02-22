
const sectionRecipes = document.querySelector(".recipes")

function displayRecipes(Recipes){
     Recipes.forEach(recipe => {
        const ingredients = recipe.ingredients
        const Template = new recipesFactory(recipe,ingredients);
        sectionRecipes.appendChild(Template.getRecipesCard());
        Template.getIngredientCard(recipe,ingredients);
        })
    }
     
function noRepeatArray(arrData){
        var arr = arrData.flat();
        var newArr = [...new Set(arr)];
        return newArr
    
    }

function getIngredientsList(ingredientsData){
    var newList = [];
    ingredientsData.forEach((obj)=>{
        for(let i = 0; i < obj.length; i ++){
        const newArry = obj[i].ingredient
        newList.push(newArry)}
    })
    return newList;

}
async function init(){
    const dataApi =  new recipesApi("data/recipes.json");
    const allRecipes = await dataApi.getAllData(); 
    const ingredientsData = await dataApi.getDataIngredients();
    const appareilsData = await dataApi.getDataAppareils();
    const ustensilsData = await dataApi.getDataUstensils();
    console.log("all",allRecipes)

    displayRecipes(allRecipes);
    
    const ustensilsList = noRepeatArray(ustensilsData) 
  
    const appareilsList = noRepeatArray(appareilsData)

    const ingreArry = getIngredientsList(ingredientsData)
    const ingredientsList = noRepeatArray(ingreArry)
    
    displayingredientList(ingredientsList);
    displayAppareilsList(appareilsList);
    displayUstensilesList(ustensilsList);

    /////////////////////////
    /* filterSearchBar1(allRecipes) */ 
    
}
init();

//search bar
const searchBar = document.getElementById("search-bar")
searchBar.addEventListener('keyup', e =>{
    
    const searchedLetters = e.target.value.toLowerCase().replace(/\s/g, "")
    console.log(searchedLetters);
    filterSearchBar(searchedLetters);
})

function filterSearchBar(letters){
    const recipesCard = document.querySelectorAll(".recipes_card:not(.nonvisible)")
    console.log("recipesCard",recipesCard,letters)
    
    if (letters.length > 2){
        for( let i = 0; i < recipesCard.length; i ++){
            if(recipesCard[i].textContent.toLowerCase().replace(/\s/g, "").includes(letters)){
                recipesCard[i].classList.remove("nonvisible")
                
            }else{
                recipesCard[i].classList.add("nonvisible")
         }
        }
        }
    checkResult();
    
}
function checkResult(){
    
    const restCard = document.querySelectorAll(".recipes_card:not(.nonvisible)")
    const divSearchbar = document.querySelector(".search-bar")
  /*   console.log("checkResult",restCard,divSearchbar) */
    if(restCard.length == 0){
        divSearchbar.setAttribute("data-error", "Vous pouvez chercher «tarte aux pommes », « poisson », etc...");
        divSearchbar.setAttribute("data-error-visible", true)
    }
    else{
        divSearchbar.removeAttribute("data-error");
        divSearchbar.removeAttribute("data-error-visible")
    }
}

// search par 3 champs

const champIngredients = document.getElementById("search-champs_ingredients")
const champAppareils =  document.getElementById("search-champs_appareils")
const champUstensiles =  document.getElementById("search-champs_ustensiles")
const divIngreList = document.querySelector(".ingredients-list")

const divApparList = document.querySelector(".appareils-list")
const appraListLength = divApparList.length
const divUstenList = document.querySelector(".ustensiles-list")
const ustenListLength = divUstenList.length
// function filtre par mot
function filterChamps(letters,list){
    console.log("filterChamps")
    
        for( let i = 0; i < list.length; i ++){
            if(list[i].textContent.toLowerCase().replace(/\s/g, "").includes(letters)){
                list[i].classList.remove("nonvisible")
                
            }else{
                list[i].classList.add("nonvisible")
                 }
        }
}
// search ingredients

champIngredients.addEventListener('keyup', (e) =>{
    
    const IngredientsList = document.querySelectorAll(".ingredients-list p")
    const searchedLetters = e.target.value.toLowerCase().replace(/\s/g, "")
    if(e.target.value.length > 2){
    filterChamps(searchedLetters,IngredientsList)
    divIngreList.style.display = "flex"; // montrer le resultat de recherche
    divIngreList.style.flexDirection = "column";

    creatTag(IngredientsList)
   
    }
})

//seaarch Appareils
champAppareils.addEventListener('keyup', (e) =>{
    
    const AppareilsList = document.querySelectorAll(".appareils-list p")
    const searchedLetters = e.target.value.toLowerCase().replace(/\s/g, "")
    if(e.target.value.length > 2){
    filterChamps(searchedLetters,AppareilsList)
    divApparList.style.display = "flex"; // montrer le resultat de recherche
    divApparList.style.flexDirection = "column";
    creatTag(AppareilsList)}
    
})
//search ustensiles
champUstensiles.addEventListener('keyup', (e) =>{
    
    const ustensilesList = document.querySelectorAll(".ustensiles-list p")
    const searchedLetters = e.target.value.toLowerCase().replace(/\s/g, "")
    if(e.target.value.length > 2){
    filterChamps(searchedLetters,ustensilesList)
    divUstenList.style.display = "flex"; // montrer le resultat de recherche
    divUstenList.style.flexDirection = "column";
    
    creatTag(ustensilesList)}
    
})


function cleanListNonvisible(){
    const nonvisibleList = document.querySelectorAll(".list.nonvisible")
    nonvisibleList.forEach((list)=>list.classList.remove("nonvisible"))
}
function cleanCardNonvisible(){
    const nonvisibleCard = document.querySelectorAll(".recipes_card.nonvisible")
    nonvisibleCard.forEach((list)=>list.classList.remove("nonvisible"))
}

//creat Tag
var tagList = [];
function creatTag(lists){
   
    console.log("creatTag")
    const parentList = lists[0].parentNode

    for(let i = 0; i < lists.length; i++){
    lists[i].addEventListener("click",(e)=>{
        
        const listSelected = e.target.textContent
        const motDeCle = listSelected.toLowerCase().replace(/\s/g, "")
        if(tagList.indexOf(listSelected) == -1){
           tagFactory(listSelected,e);
           tagList.push(listSelected);
           console.log('taglist',tagList,e.target.parentNode.classList)
           parentList.style.display = "none";
           cleanListNonvisible();
           filterSearchBar(motDeCle) 
        }
        else return
            
    })
    }
}
// close tag
function closeTag(_this){
   console.log(tagList[0])
   const btnsClose = document.querySelectorAll(".div-tag .button-close")
   const tagLetters = _this.previousElementSibling.textContent
   console.log("KKK",btnsClose,tagLetters)
   _this.parentNode.remove();
   removeByValue(tagList, tagLetters)
   cleanCardNonvisible();
   for(let i=0 ; i< tagList.length; i++){
    const restTagLetters = tagList[i].toLowerCase().replace(/\s/g, "")
    filterSearchBar(restTagLetters)
   }
  
}
// remove un value dans taglist
function removeByValue(arr, val) {
    for(var i = 0; i < arr.length; i++) {
     if(arr[i] == val) {
      arr.splice(i, 1);
      break;
     }}}

function changeArrow(_this){
    const arrowDown = _this.nextElementSibling;
    const arrowUp = arrowDown.nextElementSibling;
    arrowDown.style.visibility= "hidden";
    arrowUp.style.visibility= "visible";
 }
 
 function gestionListApresBlur(_this){
     const arrowDown = _this.nextElementSibling;
     const arrowUp = arrowDown.nextElementSibling;
     if(_this.value ==""){
         const parentList = _this.parentNode.lastElementChild
 
         parentList.style.display = "none";
         _this.style.width='170px',
         cleanListNonvisible();
         arrowDown.style.visibility= "visible";
         arrowUp.style.visibility= "hidden";
     }
 
 }
 

/////////////////////
/*  function filterSearchBar1(allRecipes){
    console.log("11",allRecipes)
    sectionRecipes.innerHTML= ""
    if(searchedLetters.length > 2){
    const filteredArray = allRecipes.filter(el =>
        el.name.includes(searchedLetters) ||
        el.ingredients.tostring().includes(searchedLetters) ||
        el.description.includes(searchedLetters)
        )
        displayRecipes(filteredArray)
    }
}*/
