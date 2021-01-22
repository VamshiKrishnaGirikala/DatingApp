import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { JwtDecodeTokenModel } from 'src/app/models/jwt-decode-token.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.apiUrl}auth/`;
  jwtHelper = new JwtHelperService();
  decodedToken: JwtDecodeTokenModel;
  constructor(private http: HttpClient) { }

  login (model: any):Observable<void>{
    return this.http.post(`${this.baseUrl}login`, model).pipe(
      map((response: any) => {
        const user = response;
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        console.log("token",this.decodedToken)
      })
    )
  }

  register(model:any):Observable<any> {
   return this.http.post(`${this.baseUrl}register`, model);
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
