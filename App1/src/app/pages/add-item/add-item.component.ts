import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

export interface Item {
  name: string;
  age: number;
  salary: number;
  dateStart: string;
  office: string;
  position: string;
}

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure FormsModule is imported
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  firestore: Firestore = inject(Firestore);
  newItem: Item | null = { // Initialize newItem
    name: '',
    age: 18,
    salary: 1000000,
    dateStart: '',
    office: '',
    position: ''
  };
  positions: string[] = ['Developer', 'Manager', 'Designer', 'Tester', 'Intern'];


  constructor(private router: Router) {}

  onCancel() {
    console.log('Form cancelled');

    this.newItem = {
      name: '',
      age: 18,
      salary: 1000000,
      dateStart: '',
      office: '',
      position: ''
    };  
    this.router.navigate(['/admin']); // Navigate back to the main page after successful addition

  }
  onSubmit() {
    if (this.newItem) { // Ensure newItem is not null
      const aCollection = collection(this.firestore, 'items');
      addDoc(aCollection, this.newItem).then(() => {
        console.log('Item added successfully');
        this.router.navigate(['/admin']); // Navigate back to the main page after successful addition
      }).catch(error => {
        console.error('Error adding item: ', error);
      });
    }
  }
}
