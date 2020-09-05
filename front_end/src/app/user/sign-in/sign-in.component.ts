import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  serverErrorMessages: string;
  showSuccessMessage: boolean;


  constructor(public userService: AuthService, public router: Router) { }
  model = {
    username: '',
    password: ''
  }
  ngOnInit(): void {
    
  }
  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );

  }

}
