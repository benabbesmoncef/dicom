import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatTable} from '@angular/material';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';


export interface ExamanData {
  examen_type: string;
  position: number;
  medecin: number;
  examen_compte_rendu: string;
  valide: boolean;
  patient: number;
}

export interface File {
  examen: number;
  content: any;
}

const ELEMENT_DATA: ExamanData[] = [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {
  token = localStorage.getItem('userToken');
  displayedColumns: string[] = ['position', 'examen_type', 'medecin', 'examen_compte_rendu', 'action'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  examList;
  resultat;
  detaitUser;
  role: string;
  last_name: string;
  first_name: string;
  examen;
  idex;
  public uploader: FileUploader = new FileUploader({});
  form: FormGroup;
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  constructor(public formBuilder: FormBuilder, public dialog: MatDialog, private router: Router, public authService: AuthService) {
  }

  ngOnInit() {
    const ite = localStorage.getItem('user');
    console.log(ite);
    this.getUser(ite);
    this.getMyExams();
    /* let examen = this.examList.length + 1;*/
    /*    this.form = this.fb.group({
          content: ['']
        });*/
    this.form = this.formBuilder.group({
      profile: ['']
    });
  }

  getMyExams() {
    this.authService.getAllExamen().subscribe(data => {
      this.examList = data;
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '450px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Ajouter') {
        this.addRowData(result.data);
        console.log('result.data');
        console.log(result.data);
        this.resultat = result.data.File;
        this.upload(this.resultat);
      } else if (result.event === 'Modifier') {
        this.updateRowData(result.data);
      } else if (result.event === 'Supprimer') {
        this.deleteRowData(result.data);
      }
    });
  }

  /*------------------------------------------------------------------*/
  addRowData = (row_obj) => {
    console.log(row_obj);
    this.authService.addExamen(row_obj).subscribe(
      data => {
        this.getMyExams();
      },
      erros => {
        console.log(erros);
        console.log('No register');
      });
  }
  /*-------------------------------------------------------------------*/
  updateRowData(row_obj) {
    this.authService.updateExamen(row_obj).subscribe(
      data => {
        console.log(data);
        this.dataSource.push(data);
        this.getMyExams();
      },
      erros => {
        console.log(erros);
        console.log('No register');
      });
  }
  /*-------------------------------------------------------------------*/
  deleteRowData(row_obj) {
    this.authService.deleteExamen(row_obj.pk).subscribe(
      data => {
        console.log(data);
        this.getMyExams();
      },
      erros => {
        console.log(erros);
        console.log('No register');
      });
  }

  /*-------------------------------------------------------------------------*/
  getUser(ite) {
    this.authService.getTypeUser(ite).subscribe(data => {
      console.log(data, 'get user cv tet3ada');
      this.detaitUser = data;
      if (this.detaitUser.role_subscriber === 1) {
        this.role = 'Patient';
      } else {
        this.role = 'Médecin';
      }
    }, error => {
      console.log(error);
    });
  }

  onSubmit() {
    this.router.navigate(['/dicomWeb']);
  }

  /*  onValide(row_obj) {
         row_obj.valide = true;
         console.log(row_obj.valide);
         console.log(row_obj);
         this.authService.updateExamen(row_obj).subscribe(
        data => {
          this.dataSource.push(data);
          this.getMyExams();
        },
        erros => {
          console.log(erros);
          console.log('No register');
        });
    }*/

  /* _______________________________________________________________________ */

  /*  getFiles(): FileLikeObject[] {
      return this.uploader.queue.map((fileItem) => {
        console.log('this is fileItem to upload');
        console.log(fileItem.file.rawFile);
        return fileItem.file;
      });
    }*/

  /*  upload() {
      let files = this.getFiles();
      console.log('this is files to upload');
      console.log(files);
      files.forEach((file) => {
        let formData = new FormData();
        console.log(formData);
        formData.append('examen', '154');
        formData.append('content', file.rawFile, file.name);
        console.log('append formData');
        console.log(formData.get('examen'));
        console.log(formData.get('content'));
        this.authService.upload(formData).subscribe(
            data => {
              console.log('data cv ');
              console.log(data);
            },
            erros => {
              console.log(erros);
              console.log('No register');
            });
      });
    }*/
  getIDexamen() {
    this.getMyExams();
    console.log('id examen = ');
    const xx = this.examList.length;
    console.log(this.examList);
    console.log(xx);
    console.log('this.examList[xx]');
    const yy = this.examList[xx - 1].pk;
    console.log(yy);
    return yy;
  }
  upload(files) {
    console.log('this is files to upload');
    console.log(files);
    const idexamn = this.getIDexamen();
    console.log('this is idexamn');
    console.log(idexamn);
    files.forEach((file) => {
      let formData = new FormData();
      console.log(formData);
      formData.append('examen', idexamn + 1);
      // formData.append('content', file.rawFile, file.name);
      formData.append('content', file.rawFile);
      console.log('append formData');
      console.log(formData.get('examen'));
      console.log(formData.get('content'));
      this.authService.upload(formData).subscribe(
        data => {
          console.log('data cv ');
          console.log(data);
        },
        erros => {
          console.log(erros);
          console.log('No register');
        });
    });
  }
}
