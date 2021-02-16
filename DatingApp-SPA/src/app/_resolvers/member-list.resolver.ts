import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../models/user";
import { AlertifyService } from "../_services/alertify/alertify.service";
import { UserService } from "../_services/user/user.service";

@Injectable({
  providedIn: "root",
})
export class MemberListResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 5;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
      catchError((error) => {
        this.alertify.error("Problem retrieving data");
        this.router.navigate(["/home"]);
        return of(null);
      })
    );
  }
}
