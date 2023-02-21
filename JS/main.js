
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
    console.log("ustensilsList",ustensilsList)

    const appareilsList = noRepeatArray(appareilsData)
    console.log("appareilsList",appareilsList)

    const ingreArry = getIngredientsList(ingredientsData)
    const ingredientsList = noRepeatArray(ingreArry)
    console.log("ingredientsList",ingredientsList)
    

    displayingredientsList(ingredientsList)

    /////////////////////////
    /* filterSearchBar1(allRecipes) */ 
    
}
init();

const searchBar = document.getElementById("search-bar")
searchBar.addEventListener('keyup', e =>{
    const recipesCard = document.querySelectorAll(".recipes_card")
    const searchedLetters = e.target.value.toLowerCase().replace(/\s/g, "")
    console.log(searchedLetters);
    filterSearchBar(searchedLetters,recipesCard);
})

function filterSearchBar(letters,card){
    
    if (letters.length > 2){
        for( let i = 0; i < card.length; i ++){
            if(card[i].textContent.toLowerCase().includes(letters)){
                card[i].style.display ="flex";
                console.log(card[i].textContent)
            }else{
                card[i].style.display ="none";
         }
        }
    }
}

// rechercher dans le champ d'ingredient
const champIngredients = document.getElementById("search-champs_ingredients")
const divIngreList = document.querySelector(".ingredients-list")


const divApparList = document.querySelector(".appareils-list")
const appraListLength = divApparList.length
const divUstenList = document.querySelector(".ustensiles-list")
const ustenListLength = divUstenList.length


champIngredients.addEventListener('keyup', (e) =>{
    
    const IngredientsList = document.querySelectorAll(".ingredients-list p")
    const searchedLetters = e.target.value.toLowerCase().replace(/\s/g, "")
    
    
    filterChamps(searchedLetters,IngredientsList)
    divIngreList.style.display = "flex"; // montrer le resultat de recherche
    divIngreList.style.flexDirection = "column";
    creatTag(IngredientsList);
    
})
// function filtre par mot
function filterChamps(letters,list){
    if (letters.length > 2){
        for( let i = 0; i < list.length; i ++){
            if(list[i].textContent.toLowerCase().includes(letters)){
                list[i].classList.remove("nonvisible")
                
            }else{
                list[i].classList.add("nonvisible")
                 }
        }}
    

}

function cleanClassNonvisible(){
    /* const a = _this.parentNode.lastElementChild.childNodes */
    const visibleList = document.querySelectorAll(".list.nonvisible")
    visibleList.forEach((list)=>list.classList.remove("nonvisible"))
}

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
        cleanClassNonvisible();
        arrowDown.style.visibility= "visible";
        arrowUp.style.visibility= "hidden";
    }

}
var tagList = [];
function creatTag(lists){
    
    const parentList = lists[0].parentNode
    for(let i = 0; i < lists.length; i++){
    lists[i].addEventListener("click",(e)=>{
        
        const listSelected = e.target.textContent
        if(tagList.indexOf(listSelected) == -1){
           displayTag(listSelected);
           tagList.push(listSelected);
           console.log('taglist',tagList,e.target )
           parentList.style.display = "none";
           cleanClassNonvisible();
           
        }else{
            console.log("KKK",listSelected,e.target)
            console.log(tagList.indexOf(listSelected))
    }
    })
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
