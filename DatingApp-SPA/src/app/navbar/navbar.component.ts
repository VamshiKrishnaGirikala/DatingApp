import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { AuthService } from '../_services/auth-service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  userName: string;
  constructor(private authService:AuthService,private alertifyService:AlertifyService,private router:Router) { }

  ngOnInit() {
    if (this.authService.decodedToken && this.authService.decodedToken.unique_name) {
      this.userName = this.authService.decodedToken.unique_name;
    }
  }

  login(): void {
    this.authService.login(this.model).subscribe(resp => {
      this.alertifyService.success("logged in successfully");
      if (this.authService.decodedToken && this.authService.decodedToken.unique_name) {
      this.userName = this.authService.decodedToken.unique_name;
    }
    }, error => {
      this.alertifyService.error(error);
    }, () => {
        this.router.navigate(['/members']);
    });
  }

  loggedIn():boolean {
    return this.authService.loggedIn();
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.alertifyService.message("logged out");
    this.router.navigate(['/home']);

  }

}
