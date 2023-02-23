/* async function getPhotographersData() {//recupere des data photographer

    const res = await fetch("data/recipes.json");
    const data = await res.json();
    const DataName = data.recipes;

    return ({recipes: DataName})// retourner le tableau photographers seulement une fois récupéré
}

 */


class api{
    constructor(url){
        this._url = url
    }
    async getData(){
        return fetch(this._url)
        .then(res => res.json())
        .then(res => res.recipes)
        .catch(err => console.log('an error occurs', err))
        
    }
    
       
    }


class recipesApi extends api{

    constructor(url) {
        super(url)
}

 async getAllData(){
    return await this.getData()
 }

 async getDataName(){
    const recipes = await this.getData()
    const name = recipes.map(rec => {return rec.name})
    return name;

 }
 async getDataIngredients(){
    const recipes = await this.getData()
    const ingredients = recipes.map(rec => {return rec.ingredients})
    return ingredients;

 }
 async getDataUstensils(){
    const recipes = await this.getData()
    const ustensils = recipes.map(rec => {return rec.ustensils})
    return ustensils;
 }
 async getDataAppareils(){
    const recipes = await this.getData()
    const appareils = recipes.map(rec => {return rec.appliance})
    return appareils;
  
 }

}
