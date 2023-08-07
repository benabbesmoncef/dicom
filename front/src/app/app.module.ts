import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
/* Routing */
import { AppRoutingModule } from './app-routing.module';
/* Components */
import { AppComponent } from './app.component';
import { DicomViewerModule } from 'ng-dicomviewer';
import { DicomWebComponent } from './dicom-web/dicom-web.component';

import { HomeComponent } from './home';
import { HeaderComponent } from './header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {MatButtonModule, MatCardModule, MatIconModule, MatProgressBarModule} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {FileUploadModule} from 'ng2-file-upload';
import { HomeMedecinComponent } from './home-medecin/home-medecin.component';


@NgModule({
  declarations: [
    AppComponent,
    DicomWebComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    DialogBoxComponent,
    HomeMedecinComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    DicomViewerModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatCardModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    NgxMatFileInputModule,
    FileUploadModule
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
