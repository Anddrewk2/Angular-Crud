import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, CollectionReference } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { SearchService } from '../../services/search.service';
import { NgxPaginationModule } from 'ngx-pagination';

export interface Item {
  id: string;
  name: string;
  age: string;
  salary: string;
  dateStart: string;
  office: string;
  position: string;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  searchService: SearchService = inject(SearchService);
  aCollection: CollectionReference;
  items$: Observable<Item[]>;
  filteredItems$: Observable<Item[]>;
  searchTerm$ = new BehaviorSubject<string>('');
  noResultsFound: boolean = false;
  
  // Pagination configuration
  page: number = 1;
  pageSize: number = 4;

  constructor() {
    this.aCollection = collection(this.firestore, "items");
    this.items$ = collectionData(this.aCollection, { idField: 'id' }) as Observable<Item[]>;
    this.filteredItems$ = combineLatest([this.items$, this.searchTerm$]).pipe(
      map(([items, searchTerm]) => 
        items.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.office.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  ngOnInit() {
    this.searchService.currentSearchTerm.subscribe(term => {
      this.searchTerm$.next(term);
      this.page = 1; // Reset to first page when searching
    });
  }

  addItem(newItem: Item) {
    addDoc(this.aCollection, newItem).then(() => {
      console.log('Item added successfully');
    }).catch(error => {
      console.error('Error adding item: ', error);
    });
  }

  updateItem(id: string, updatedData: Partial<Item>) {
    const itemDoc = doc(this.firestore, `items/${id}`);
    updateDoc(itemDoc, updatedData).then(() => {
      console.log('Item updated successfully');
    }).catch(error => {
      console.error('Error updating item: ', error);
    });
  }

  deleteItem(id: string) {
    const itemDoc = doc(this.firestore, `items/${id}`);
    deleteDoc(itemDoc).then(() => {
      console.log('Item deleted successfully');
    }).catch(error => {
      console.error('Error deleting item: ', error);
    });
  }
}