import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DicomWebComponent } from './dicom-web/dicom-web.component';
import { HomeComponent } from './home/home.component';
import {HomeMedecinComponent} from './home-medecin/home-medecin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dicomWeb', component: DicomWebComponent },
  { path: 'home', component: HomeComponent },
  { path: 'homemedecin', component: HomeMedecinComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
