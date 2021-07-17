import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private url = 'https://ng-course-recipe-book-c23c2-default-rtdb.firebaseio.com/recipes.json';
    constructor(private http: HttpClient, 
                private recipeService: RecipeService) {}

    /*
    * Store recipe 
    */
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put(
                this.url,
                recipes
            ).subscribe( responseData => {
                console.log(responseData)
            })
    }

    /* 
    * Fetch Recipe 
    */ 
    fetchRecipes() {
        return this.http
          .get<Recipe[]>(
            this.url
          )
          .pipe(
            map(recipes => {
              return recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            }),
            tap(recipes => {
              this.recipeService.setRecipes(recipes);
            })
          )
      }
}