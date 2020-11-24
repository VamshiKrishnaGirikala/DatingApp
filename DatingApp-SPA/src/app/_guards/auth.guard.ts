import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { AuthService } from '../_services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router,private authService:AuthService,private alertifyService:AlertifyService) {

  }
  canActivate(): boolean  {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertifyService.error('You cannot pass!!!');
    this.router.navigate(['/home']);
    return false;
  }

}
