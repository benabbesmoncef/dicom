import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import {error} from 'ng-packagr/lib/utils/log';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['1', '2'];
  selected = '1';
  myForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router) {
    const formControls = {
      /*username: new FormControl(),*/
      email: new FormControl(),
      first_name: new FormControl(),
      last_name: new FormControl(),
/*      phone_number: new FormControl(),
      birth_date: new FormControl(),*/
      password: new FormControl(),
      confirm_password: new FormControl(),
      role_subscriber: new FormControl()
    };
    this.myForm = this.fb.group(formControls);
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.myForm.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['login']);
      },
      err => {
        console.log(this.myForm);
        console.log(error('mat3aditch'));
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.router.navigate(['register']);
      }
    );
  }
}
