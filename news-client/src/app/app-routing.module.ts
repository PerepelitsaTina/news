import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: HomePageComponent },
  {
    path: 'user/:id',
    canActivate: [AuthGuard],
    component: UserComponent 
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
