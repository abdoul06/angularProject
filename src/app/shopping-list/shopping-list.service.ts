import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>()

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
    this.ingredientChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
    // for ( let ingredient of ingredients) {
    //   this.addIngredients(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice())
  }

}
