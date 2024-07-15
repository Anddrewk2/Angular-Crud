import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';


@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      FooterComponent,
      LogoutModalComponent,
      SidebarComponent,
      TopbarComponent
    ],
    exports: [
      FooterComponent,
      LogoutModalComponent,
      SidebarComponent,
      TopbarComponent
    ],
    declarations: []
  })
  export class LayoutModule { }
  