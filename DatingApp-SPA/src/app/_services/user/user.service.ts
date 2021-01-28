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

  updateUser(id: any, user: User) {
    return this.http.put(`${this.baseUrl}users/${id}`, user);
  }

  setMainPhoto(userId: string | number, id: number) {
    const url = `${this.baseUrl}users/${userId}/photos/${id}/setMain`;
    return this.http.post(url, {});
  }

  deletePhoto(userId: string | number, id: number) {
    const url = `${this.baseUrl}users/${userId}/photos/${id}`;
    return this.http.delete(url);
  }
}
