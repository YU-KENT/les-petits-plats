function recipesFactory(recipes,ingredients) {

 const{ name, time, description,id} = recipes

 const{ingredient, quantity, unit} = ingredients


 function getRecipesCard(){
    
    const newDiv = document.createElement("div");
    newDiv.classList.add("recipes_card","col","my-4","d-flex","justify-content-center")
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
            <p class="col-6 description text-break">${description}</p>
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

return {name, time, description,ingredient, quantity, unit, id, getRecipesCard,  getIngredientCard}

}


