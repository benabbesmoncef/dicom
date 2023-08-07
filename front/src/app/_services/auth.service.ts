import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';


const AUTH_API = 'http://localhost:8000/backend/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = localStorage.getItem('userToken');

  constructor(private http: HttpClient, public router: Router) {
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'users/login/', {
      username: credentials.username,
      password: credentials.password,
    }, httpOptions);
  }

  getAllExamen() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Token ' + this.token);
    return this.http.get(AUTH_API + 'examens/', {headers});
  }
  getAllFile(pk) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Token ' + this.token);
    return this.http.get(AUTH_API + 'file/' + pk + '/', {headers});
  }
  addFile(file): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.token);
    const body = {
      examen: file.examen,
      content: file.content,
    };
    return this.http.post(AUTH_API + 'file/', body,
      {headers});
  }

  getAllExamenMedecin() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Token ' + this.token);
    return this.http.get(AUTH_API + 'examens/', {headers});
  }
  // get tout les file -------------------------------------------
  getAllFiles() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Token ' + this.token);
    return this.http.get(AUTH_API + 'file/', {headers});
  }

  getAllMedecin() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Token ' + this.token);
    return this.http.get(AUTH_API + 'listUsersMedecin/', {headers});
  }

  getUserId(pk) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Token ' + this.token);
    return this.http.get(AUTH_API + 'userId/' + pk + '/', {headers});
  }

  getTypeUser(usr): Observable<any> {
    console.log(usr);
    return this.http.post(AUTH_API + 'userType/', {
      user: usr
    }, httpOptions);
  }

  addExamen(examen): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.token);
    const body = {
      examen_type: examen.examen_type,
      medecin: examen.medecin,
      examen_compte_rendu: examen.examen_compte_rendu,
      patient: examen.patient,
      valide: examen.valide
    };
    return this.http.post(AUTH_API + 'examens/', body,
      {headers});
  }

  updateExamen(examen): Observable<any> {
    console.log(examen);
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.token);
    const body = {
      examen_type: examen.examen_type,
      medecin: examen.medecin,
      examen_compte_rendu: examen.examen_compte_rendu,
      patient: examen.patient,
      valide: examen.valide
    };
    return this.http.put(AUTH_API + 'exam/' + examen.pk + '/', body,
      {headers});
  }

  deleteExamen(pk): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.token);
    return this.http.delete(AUTH_API + 'exam/' + pk + '/',
      {headers});
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'patient/', {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      birth_date: user.birth_date,
      password: user.password,
      confirm_password: user.confirm_password,
      role_subscriber: user.role_subscriber
    }, httpOptions);
  }

  /*  isLoggedIn(): boolean {
      const authToken = localStorage.getItem('access_token');
      return (authToken != null);
    }
    doLogout() {
      const removeToken = localStorage.removeItem('access_token');
      if (removeToken == null) {
        this.router.navigate(['login']);
      }
    }*/
  /*  public upload(formData) {
      console.log('formData for service');
      console.log(formData);
      const headers = new HttpHeaders().set('Authorization', 'Token ' + this.token);
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', '*!/!*');
      /!*headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');*!/
      return this.http.post<any>(AUTH_API + 'file/' + formData, {headers});
    }*/
  upload(formData): Observable<any> {
    console.log('formData for service');
    console.log(formData);
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.token);
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const body = {
      examen: formData.get('examen'),
      content: formData.get('content')
    };
    console.log(formData);
    console.log(formData.get('examen'));
    console.log(formData.get('content'));
    return this.http.post(AUTH_API + 'file/', formData,
      {headers});
  }
}
