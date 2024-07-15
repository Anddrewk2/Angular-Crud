// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token'); // Lấy token từ localStorage
        },
        allowedDomains: ['example.com'], // Các domain cho phép
        disallowedRoutes: ['http://example.com/examplebadroute/'], // Các route bị từ chối
      }
    })
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
