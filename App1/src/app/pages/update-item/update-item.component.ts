import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Firestore, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

export interface Item {
  id: string;
  name: string;
  age: number;
  salary: number;
  dateStart: string;
  office: string;
  position: string;
  
}

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure FormsModule is imported
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  item: Item | null = null;
  positions: string[] = ['Developer', 'Manager', 'Designer', 'Tester', 'Intern'];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const itemDoc = doc(this.firestore, `items/${id}`);
      getDoc(itemDoc).then((docSnap) => {
        if (docSnap.exists()) {
          this.item = { id, ...docSnap.data() } as Item;
        } else {
          console.error('No such document!');
        }
      }).catch(error => {
        console.error('Error getting document: ', error);
      });
    }
  }

  onSubmit() {
    if (this.item && this.item.id) {
      const itemDoc = doc(this.firestore, `items/${this.item.id}`);
      updateDoc(itemDoc, { ...this.item }).then(() => {
        console.log('Item updated successfully');
        this.router.navigate(['/admin']); // Navigate back to the main page after successful update
      }).catch(error => {
        console.error('Error updating item: ', error);
      });
    }
  }
}
