/*dialog-box.component.ts*/
import {Component, ElementRef, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import validate = WebAssembly.validate;
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DICOMViewerComponent} from 'ng-dicomviewer';
import {map} from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';

export interface ExamanData {
  position: number;
  patient: number;
  examen_type: string;
  medecin: number;
  examen_compte_rendu: string;
  valide: boolean;
  File: any;
}



@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  action: string;
  local_data: any;
  public uploader: FileUploader = new FileUploader({});
  form: FormGroup;
  medecinList;
  fileControl;
  typesExams = [
    {value: 'IRM', viewValue: 'IRM'},
    {value: 'SCANNER', viewValue: 'Scanner'},
    {value: 'ECHOGRAPHIE', viewValue: 'Échographie'},
    {value: 'FIBROSCOPIE', viewValue: 'Fibroscopie'},
    {value: 'MAMMOGRAPHIE', viewValue: 'Mammographie'}
  ];
  public files;
  constructor
  (private formBuilder: FormBuilder,
   public dialogRef: MatDialogRef<DialogBoxComponent>,
   @Optional() @Inject(MAT_DIALOG_DATA) public data: ExamanData, public authService: AuthService) {
    console.log(data);
    this.local_data = {...data};
    this.local_data.valide = false;
    this.action = this.local_data.action;
  }

  ngOnInit() {
    this.getAllMedecins();
    /*    this.fileControl.valueChanges.subscribe((files: any) => {
          if (!Array.isArray(files)) {
            this.files = [files];
            console.log('this.files Liste');
            console.log(this.files);
          } else {
            this.files = files;
            console.log('this.files file');
            console.log(this.files);
          }
        });*/
    this.form = this.formBuilder.group({
      profile: ['']
    });
  }
  /*  public uploadFile(event: any): void {
      console.log('event.target');
      console.log(event);
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        console.log(file);
        this.files = file;
        this.form.get('centent').setValue(file);
      }
      console.log('this.files list tout les files');
      console.log(this.files);
    }*/

  doAction() {
    const item = localStorage.getItem('user');
    this.local_data.patient = item;
    this.local_data.File = this.getFiles();
    console.log('this is data');
    console.log(this.local_data);
    this.dialogRef.close({event: this.action, data: this.local_data});
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  getAllMedecins() {
    this.authService.getAllMedecin().subscribe(data => {
      this.medecinList = data;
      console.log(data);
    }, error => {
      console.log(error);
    });
  }




  /*  onChange(event) {
      console.log(event.target.files);
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.form.get('profile').setValue(file);
      }
    }
    getFiles(): FileLikeObject[] {
      return this.uploader.queue.map((fileItem) => {
        console.log('fileItem.file');
        console.log(fileItem.file);
        return fileItem.file;
      });
    }
    upload(): void {
      const files = this.getFiles();
      console.log(files);
      files.forEach((file) => {
        const formData = new FormData();
        formData.append('file' , file.rawFile, file.name);

        console.log(formData);
      return formData;
      });
    }*/
  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      console.log('this is fileItem to upload');
      console.log(fileItem.file);
      console.log(fileItem.file.rawFile);
      return fileItem.file;
    });
  }

}
