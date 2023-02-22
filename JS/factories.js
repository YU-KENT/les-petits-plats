function recipesFactory(recipes,ingredients) {

 const{ name, time, description,id,appliance, ustensils} = recipes
 const{ingredient, quantity, unit} = ingredients

 function getRecipesCard(){
    
    const newDiv = document.createElement("div");
    newDiv.classList.add("recipes_card","col","my-4")
    const recipesCard = `
    <div class="card rounded" style="width: 24rem; height: 23rem">
      <img src="icons/c7bebe.png" class="card-img-top h-50" alt="photo de plat">
       <div class="card-body h-50 bg_grey container-fluid">
         <div class="row card-title">
            <h5 class="col-9 text-wrap ">${name}</h5>
            <div class ="d-flex col-3 align-items-center p-0">
              <img src="icons/outline-access-time.svg" style="width:23px; height:23px" alt="icon pour le temps">
              <span class="time ms-1 fw-bold">${time} min</span>
            </div>
         </div>
         <div class="card-content row d-flex">
            <div class="col-6 d-flex flex-column rec_ingredients">
            </div>
            <p class="col-6 description">${description}</p>
            <p>${appliance}</p>
            <p>${ustensils}</p>
         </div>
      </div>
   </div>
    `
  newDiv.innerHTML = recipesCard;
  return(newDiv)
}

function getIngredientCard(){
    const divIngredients = document.querySelectorAll(".rec_ingredients")
    const recId = recipes.id
    ingredients.forEach(ele =>{
    
      const newP = document.createElement("p")
      newP.classList.add("m-0")
      const ingredientsCardB = `<span class="ingredients_nom">${ele.ingredient}: </span> ${ele.quantity}`
      const ingredientsCardA = `<span class="ingredients_nom">${ele.ingredient}: </span> ${ele.quantity} ${ele.unit}`
      const ingredientsCardC = `<span class="ingredients_nom">${ele.ingredient}</span>`
      if(!ele.unit){
         if(!ele.quantity){
          newP.innerHTML = ingredientsCardC
         }else
        newP.innerHTML = ingredientsCardB
      }else {
        newP.innerHTML = ingredientsCardA}
      divIngredients[recId-1].appendChild(newP)
  })
  }

return {name, time, description,ingredient, quantity, unit, id,appliance,ustensils, getRecipesCard,  getIngredientCard}

}

const divIngredientsList = document.querySelector(".ingredients-list")
const divAppareilsList = document.querySelector(".appareils-list")
const divUstensilesList = document.querySelector(".ustensiles-list")

function displayingredientList(arry){

  for(let i = 0; i < arry.length; i++){
    const newP = document.createElement("p")
    newP.classList.add("col","list")
    newP.textContent = arry[i]
    divIngredientsList.appendChild(newP)
  }

}

function displayAppareilsList(arry){

  for(let i = 0; i < arry.length; i++){
    const newP = document.createElement("p")
    newP.classList.add("col","list")
    newP.textContent = arry[i]
    divAppareilsList.appendChild(newP)
  }

}
function displayUstensilesList(arry){

  for(let i = 0; i < arry.length; i++){
    const newP = document.createElement("p")
    newP.classList.add("col","list")
    newP.textContent = arry[i]
    divUstensilesList.appendChild(newP)
  }

}


function tagFactory(list,e){
const divTag = document.querySelector(".div-tag")
const newDiv = document.createElement("div")
newDiv.classList.add("tag")
newDiv.innerHTML = `
<span>${list}</span>
<span class="button-close" onclick="closeTag(this)"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8Z"/></svg>
</span>
`
divTag.style.display ="flex"
divTag.appendChild(newDiv)
const targetChamp = e.target.parentNode.classList.toString()

if(targetChamp.includes("ingredients")){
  newDiv.classList.add("ingredients")
}else if (targetChamp.includes("appareils")){
  newDiv.classList.add("appareils")
}else if (targetChamp.includes("ustensiles")){
  newDiv.classList.add("ustensiles")
}
}
