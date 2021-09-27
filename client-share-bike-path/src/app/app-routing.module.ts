import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from "./login-page/login-page.component";
import { MainAppComponent } from './main-app/main-app.component';

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'mainapp', component: MainAppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
