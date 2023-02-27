
const sectionRecipes = document.querySelector(".recipes")

async function init(){
    //get data
    const dataApi =  new recipesApi("data/recipes.json");
    const allRecipes = await dataApi.getAllData(); 
    const ingredientsData = await dataApi.getDataIngredients();
    const appareilsData = await dataApi.getDataAppareils();
    const ustensilsData = await dataApi.getDataUstensils();
    /* console.log("all",allRecipes) */

    displayRecipes(allRecipes);
    //get all list ingredients/appreils/ustensils
    const ustensilsList = noRepeatArray(ustensilsData) 
    const appareilsList = noRepeatArray(appareilsData)
    const ingreArry = getIngredientsList(ingredientsData)
    const ingredientsList = noRepeatArray(ingreArry)
    /* console.log(appareilsList) */
    // display list 
    displayingredientList(ingredientsList);
    displayAppareilsList(appareilsList);
    displayUstensilesList(ustensilsList);

    //search bar
    searchBar.addEventListener('keyup', e =>{
    
        const searchedLetters = e.target.value.toLowerCase().replace(/\s/g, "").toString()
        if(searchedLetters.length > 2){
        filterSearchBar(searchedLetters,allRecipes)
       }/* else if(e.target.value == ""){
        cleanCardNonvisible();
        } */
    })

   // search ingredients

    champIngredients.addEventListener('keyup', (e) =>{
    const IngredientsList = document.querySelectorAll(".ingredients-list p")
    const searchedLetters = e.target.value.toLowerCase().replace(/\s/g, "")

    if(e.target.value.length > 2){
    filterChamps(searchedLetters,IngredientsList)
    divIngreList.style.display = "flex"; // montrer le resultat de recherche
    divIngreList.style.flexDirection = "column";
    creatTag(IngredientsList,allRecipes)
   
    }

//seaarch Appareils
    champAppareils.addEventListener('keyup', (e) =>{
    const AppareilsList = document.querySelectorAll(".appareils-list p")
    const searchedLetters = e.target.value.toLowerCase().replace(/\s/g, "")

    if(e.target.value.length > 2){
    filterChamps(searchedLetters,AppareilsList)
    divApparList.style.display = "flex"; // montrer le resultat de recherche
    divApparList.style.flexDirection = "column";
    creatTag(AppareilsList,allRecipes)}
    
})
//search ustensiles
    champUstensiles.addEventListener('keyup', (e) =>{
    const ustensilesList = document.querySelectorAll(".ustensiles-list p")
    const searchedLetters = e.target.value.toLowerCase().replace(/\s/g, "")

    if(e.target.value.length > 2){
    filterChamps(searchedLetters,ustensilesList)
    divUstenList.style.display = "flex"; // montrer le resultat de recherche
    divUstenList.style.flexDirection = "column";
    
    creatTag(ustensilesList,allRecipes)}
    
})

})
    
}
init();


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

//function search bar
const searchBar = document.getElementById("search-bar")

function filterSearchBar(Letters,allRecipes){
    
    console.log("Letters",Letters )

    sectionRecipes.innerHTML= "";
    
    const filteredArray = allRecipes.filter(filterRec)
        function filterRec(recipe){
        const arryIngredients = recipe.ingredients.map(obj => {return obj.ingredient.toLowerCase().replace(/\s/g, "")})
        if(arryIngredients.join().includes(Letters)){
            return true
        }
        else if (recipe.name.toLowerCase().replace(/\s/g, "").includes(Letters)){
            return true
        }else if (recipe.description.toLowerCase().replace(/\s/g, "").includes(Letters)){
            return true
        }
            return false
        }

        console.log("Letters",Letters)
        console.log("filteredArray",filteredArray)
        displayRecipes(filteredArray)
        const recipesVisible = document.querySelectorAll(".recipes_card")
        recipesVisible.forEach((recipe)=> recipe.classList.add("visible"))
        console.log("recipesVisible",recipesVisible)
        checkResult();
}


function checkResult(){ //Aucune recette correspondante à la recherche,message error
    const divSearchbar = document.querySelector(".search")
    const restCard = document.querySelectorAll(".recipes_card.visible")
    
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


function cleanListNonvisible(){
    const nonvisibleList = document.querySelectorAll(".list.nonvisible")
    nonvisibleList.forEach((list)=>list.classList.remove("nonvisible"))
}
function cleanCardNonvisible(){
    const nonvisibleCard = document.querySelectorAll(".recipes_card.nonvisible")
    nonvisibleCard.forEach((list)=>list.classList.remove("nonvisible"))
}

//creat Tag
var tagList = []; // un tag list
function creatTag(lists,allRecipes){
    console.log("creatTag")
    console.log("allRecipes",allRecipes)
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
           /* cleanListNonvisible(); */
           filterSearchBar(motDeCle,allRecipes) 
        }
        else return
            
    })
    }
}
// close tag
function closeTag(_this){
   const btnsClose = document.querySelectorAll(".div-tag .button-close")
   const tagLetters = _this.previousElementSibling.textContent
   console.log("KKK",btnsClose,tagLetters)
   _this.parentNode.remove();
   removeByValue(tagList, tagLetters)
   /* cleanCardNonvisible(); */
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
 


