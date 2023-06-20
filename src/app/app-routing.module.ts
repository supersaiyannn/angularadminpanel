import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoPageComponent } from './no-page/no-page.component';
import { RegisterComponent } from './register/register.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { component: LoginComponent, path: 'login' },
  { component: RegisterComponent, path: 'register' },
  { component: HomeComponent, path: 'home', canActivate: [AuthGuard] },

  { path: 'user', component: UserlistComponent, canActivate: [AuthGuard] },

  { component: NoPageComponent, path: '**', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
