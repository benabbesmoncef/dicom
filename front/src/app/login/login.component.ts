import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  detaitUser: any;
  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router, private tokenStorage: TokenStorageService) {
    const formControls = {
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirm_password: new FormControl(),
      role_subscriber: new FormControl()
    };
    this.myForm = this.fb.group(formControls);
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      /* this.roles = this.tokenStorage.getUser().roles;*/
    }
  }

  onSubmit() {
    this.authService.login(this.myForm.value).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('userToken', data['auth_token']);
        localStorage.setItem('user', data['user']);
        const item = localStorage.getItem('user');
        console.log(item);

        this.isLoginFailed = false;
        this.getUser(item);
        this.isLoggedIn = true;
      },
      err => {
        console.log('erreur =>');
        console.log(err);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  /*  onSubmit() {
      this.authService.login(this.myForm.value).subscribe(
        data => {
          console.log(data);
          localStorage.setItem('userToken', data['auth_token']);
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.reloadPage();
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }*/
  getUser(item) {
    this.authService.getTypeUser(item).subscribe(data => {
      console.log(data, 'get user cv tet3ada');
      this.detaitUser = data;
      this.reloadPage(this.detaitUser);
    }, error => {
      console.log(error);
    });
  }
  reloadPage(user) {
    console.log(user, 'reload page im here');
    if (user.role_subscriber === 1) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['homemedecin']);
    }

  }
}


