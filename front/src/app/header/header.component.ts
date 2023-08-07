import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  email: string;
  myToken;

  constructor(private tokenStorageService: TokenStorageService, public router: Router, public authService: AuthService) {
  }

  ngOnInit() {
    if (localStorage.getItem('userToken')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToHome() {
    if (localStorage.getItem('userToken')) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  logout() {
    console.log('logout');
    localStorage.removeItem('userToken');
    this.router.navigate(['login']);
    //this.authService.doLogout();
  }
}
