import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}users`);
  }

  getUser(id: any): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}users/${id}`);
  }

  updateUser(user: User) {
    return this.http.put(`${this.baseUrl}users`, user);
  }

  setMainPhoto( id: number) {
    const url = `${this.baseUrl}users/set-main-photo/${id}`;
    return this.http.put(url, {});
  }

  deletePhoto(userId: string | number, id: number) {
    const url = `${this.baseUrl}users/delete-photo/${id}`;
    return this.http.delete(url);
  }
}
