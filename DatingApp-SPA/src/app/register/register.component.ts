import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { AuthService } from '../_services/auth-service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  model: any = {};
  constructor(private authService:AuthService,private alertifyService:AlertifyService) { }

  ngOnInit() {
  }

  register(): void {
    this.authService.register(this.model).subscribe(() => {
     this.alertifyService.success("registration successful");
    }, error => {
        this.alertifyService.error(error);
    });
  }

  cancel(): void {
    this.cancelRegister.emit(false);
    console.log("cancelled");
  }

}
