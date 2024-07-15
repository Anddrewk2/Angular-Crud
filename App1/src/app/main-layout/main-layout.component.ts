import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../Layout/footer/footer.component';
import { LogoutModalComponent } from '../Layout/logout-modal/logout-modal.component';
import { SidebarComponent } from '../Layout/sidebar/sidebar.component';
import { TopbarComponent } from '../Layout/topbar/topbar.component';
import { MainComponent } from '../pages/main/main.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";
import { UpdateItemComponent } from '../pages/update-item/update-item.component';
import { AddItemComponent } from '../pages/add-item/add-item.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageListComponent } from '../pages/image-list/image-list.component';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet , 
    CommonModule , 
    FooterComponent,
    LogoutModalComponent,
    SidebarComponent,
    TopbarComponent,
    MainComponent,
    FormsModule,	
    	ReactiveFormsModule,
      UpdateItemComponent,
      AddItemComponent,
 HttpClientModule,
 LoginComponent,
 SignupComponent,
 NgxPaginationModule,
 ImageListComponent
],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
