import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";
import { PaginatedResult } from "../../models/pagination";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUsers(
    page?,
    itemsPerPage?,
    userParams?
  ): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    if (userParams != null) {
      params = params.append("minAge", userParams.minAge);
      params = params.append("maxAge", userParams.maxAge);
      params = params.append("gender", userParams.gender);
      params = params.append("orderBy", userParams.orderBy);
    }

    return this.http
      .get<User[]>(this.baseUrl + "users", { observe: "response", params })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }
          return paginatedResult;
        })
      );
  }

  getUser(id: any): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}users/${id}`);
  }

  updateUser(user: User) {
    return this.http.put(`${this.baseUrl}users`, user);
  }

  setMainPhoto(id: number) {
    const url = `${this.baseUrl}users/set-main-photo/${id}`;
    return this.http.put(url, {});
  }

  deletePhoto(userId: string | number, id: number) {
    const url = `${this.baseUrl}users/delete-photo/${id}`;
    return this.http.delete(url);
  }
}
