import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertifyService } from "../_services/alertify/alertify.service";
import { AuthService } from "../_services/auth-service/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  model: any = {};
  userName: string;
  photoUrl: string;
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.photoUrl.subscribe(photoUrl => {
      this.photoUrl = photoUrl;
    });
    if (
      this.authService.decodedToken &&
      this.authService.decodedToken.unique_name
    ) {
      this.userName = this.authService.decodedToken.unique_name;
    }
    // if (this.authService.currentUser && this.authService.currentUser.photoUrl) {
    //   this.photoUrl = this.authService.currentUser.photoUrl;
    // }
  }

  login(): void {
    this.authService.login(this.model).subscribe(
      (resp) => {
        this.alertifyService.success("logged in successfully");
        if (
          this.authService.decodedToken &&
          this.authService.decodedToken.unique_name
        ) {
          this.userName = this.authService.decodedToken.unique_name;
        }
        // if (
        //   this.authService.currentUser &&
        //   this.authService.currentUser.photoUrl
        // ) {
        //   this.photoUrl = this.authService.currentUser.photoUrl;
        // }
      },
      (error) => {
        this.alertifyService.error(error);
      },
      () => {
        this.router.navigate(["/members"]);
      }
    );
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  logOut(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertifyService.message("logged out");
    this.router.navigate(["/home"]);
  }
}
