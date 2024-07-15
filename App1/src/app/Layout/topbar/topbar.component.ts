import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Adjust the import path
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule , FormsModule ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  searchText: string = '';
  constructor(public authService: AuthService, private searchService: SearchService ) { }
  onSearch() {
      this.searchService.changeSearchTerm(this.searchText);
    }
  logout() {
    this.authService.logout().then(() => {
      
    }).catch((error) => {
      console.error('Logout error:', error);
      
    });
  }
}
export class TopbarModule  { }

