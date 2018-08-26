import { MobileNavComponent } from './components/mobileNav/mobielNav.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ],
  declarations: [
    NavbarComponent,
    MobileNavComponent,
    LoginComponent
  ],

  exports: [
    NavbarComponent,
    MobileNavComponent,
  ]
})
export class CoreModule { }
