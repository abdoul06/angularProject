import { Component} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  
  constructor(private dataStorageservice: DataStorageService) {}

  onSaveData() {
    this.dataStorageservice.storeRecipes();
  }
  fetchData() {
    this.dataStorageservice.fetchRecipes().subscribe();
  }
}
