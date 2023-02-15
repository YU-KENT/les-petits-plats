
const sectionRecipes = document.querySelector(".recipes")

class filter{

    constructor(recipes){
        this._name = recipes.name
        this._ingredients = recipes.ingredients
        this._ustensils = recipes.ustensils
        this._appliance = recipes.appliance
        this._description = recipes.description
    }

     filterByName(){

    }
}

function displayRecipes(Recipes){
     
    
     Recipes.forEach(recipe => {
        const ingredients = recipe.ingredients
        const Template = new recipesFactory(recipe,ingredients);
        sectionRecipes.appendChild(Template.getRecipesCard());
        Template.getIngredientCard(recipe,ingredients);
        })
        
     }

  
    










async function init(){
    const dataApi =  new recipesApi("data/recipes.json");
    const allRecipes = await dataApi.getAllData(); 
    
    displayRecipes(allRecipes);
  
}
init();