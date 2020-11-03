import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth-service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.model).subscribe(resp => {
      console.log("logged in successfully");
    }, error => {
      console.log("Failed to login");
    });
  }

  loggedIn():any {
    const token = localStorage.getItem("token");
    return !!token;
  }

  logOut(): void {
    localStorage.removeItem('token');
    console.log("logged out");
  }

}
