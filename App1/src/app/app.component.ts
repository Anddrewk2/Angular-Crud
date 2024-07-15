import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";

import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , 
    CommonModule ,  
    MainComponent,
    FormsModule,	
    	ReactiveFormsModule,
 HttpClientModule,
 NgxPaginationModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showLogin: boolean = true; // Set to true to show login component by default
  title = 'Angular-App';
  constructor() {}

  }
