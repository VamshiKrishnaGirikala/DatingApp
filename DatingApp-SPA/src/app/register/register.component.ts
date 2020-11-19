import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth-service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  model: any = {};
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  register(): void {
    this.authService.register(this.model).subscribe(() => {
      console.log("registration successful");
    }, error => {
        console.log(error);
    });
  }

  cancel(): void {
    this.cancelRegister.emit(false);
    console.log("cancelled");
  }

}
