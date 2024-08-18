import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicCheckerComponent } from './components/music-checker/music-checker.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', component: MusicCheckerComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'sign-in', component: SigninComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
