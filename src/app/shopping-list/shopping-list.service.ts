import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredient[]>()
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  
  constructor() { }
  getIngredients() {
    //TODO: copy of ingredients 
    return this.ingredients.slice();
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
    // for ( let ingredient of ingredients) {
    //   this.addIngredients(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientChanged.emit(this.ingredients.slice())
  }

}
