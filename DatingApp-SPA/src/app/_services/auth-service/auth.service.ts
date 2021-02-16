import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from "rxjs";
import { JwtDecodeTokenModel } from "src/app/models/jwt-decode-token.model";
import { environment } from "src/environments/environment";
import { User } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = `${environment.apiUrl}account/`;
  jwtHelper = new JwtHelperService();
  decodedToken: JwtDecodeTokenModel;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>("../../../assets/images/user.png");
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any): Observable<void> {
    return this.http.post(`${this.baseUrl}login`, model).pipe(
      map((response: any) => {
        const user = response;
        localStorage.setItem("token", user.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ user: user.username, photoUrl: user.photoUrl, gender: user.gender, knownAs: user.knownAs })
        );
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        this.currentUser = user;
        this.changeMemberPhoto(this.currentUser.photoUrl);
      })
    );
  }

  register(model: User): Observable<any> {
    return this.http.post(`${this.baseUrl}register`, model);
  }

  loggedIn(): boolean {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }
}
