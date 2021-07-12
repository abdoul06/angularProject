import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm; 
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number; 
  editItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
        .subscribe(
          (index: number) => {
            console.log(index)
            this.editedItemIndex = index; 
            this.editMode = true; 
            this.editItem = this.slService.getIngredient(index)
            this.slForm.setValue({
              name: this.editItem.name,
              amount: this.editItem.amount
            })
          }
          ); 
  }

  onSubmit(form: NgForm) {
    const value = form.value; 
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.slService.onIngredientAdded(newIngredient)
    }
    // we need to add this otherwise we will stuck in the update
    this.editMode = false;
    form.reset()
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear()
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false; 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }
}
