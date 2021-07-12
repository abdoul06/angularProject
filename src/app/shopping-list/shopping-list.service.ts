import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>();  


  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Pasta', 100)
  ];

  
  constructor() { }

  // return copy of Ingredients
  getIngredients() {
    return this.ingredients.slice();
  }

  // return ingredients with the index number
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  
  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice())
  }
  
  addIngredients(ingredients: Ingredient[]) {
    // for ( let ingredient of ingredients) {
      //   this.addIngredients(ingredient);
      // }
      this.ingredients.push(...ingredients);
      this.ingredientChanged.next(this.ingredients.slice())
    }
    
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    
    //TODO: Understand this call()
    this.ingredientChanged.next(this.ingredients.slice())
  }
}
