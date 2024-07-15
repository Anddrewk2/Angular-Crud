import { Routes ,RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { UpdateItemComponent } from './pages/update-item/update-item.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { authGuard } from './auth.guard'; // Đường dẫn này có thể khác, tùy vào vị trí thực tế của authGuard
import { ImageListComponent } from './pages/image-list/image-list.component';

export const routes: Routes = [
        {path:'admin', component:MainLayoutComponent,  
            canActivate: [authGuard], // Sử dụng authGuard để bảo vệ        
            children:[
                { path: 'main', component: MainComponent },
                { path: 'add-item', component: AddItemComponent },
                { path: 'update-item/:id', component: UpdateItemComponent },
                { path: 'login', component: LoginComponent },
                { path: 'CV', component: ImageListComponent },
                { path: 'signup', component: SignupComponent },    
                {path:'', component: MainComponent},     
            ]},
            {path:'login', component: LoginComponent},
            {path:'**,', redirectTo: "login", pathMatch: "full"},
   

 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
