import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-respond',
  templateUrl: './respond.component.html',
  styleUrls: ['./respond.component.scss']
})
export class RespondComponent implements OnInit {

  showSuccessMessage:Boolean;
  serverErrorMessages:String;
  constructor(private route: ActivatedRoute,public userService: AuthService, public router: Router) { }
user;
userDetails;
  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      return  this.userService.getUser(params['_id']); }))
   .subscribe(user => { this.user = user['user'];  })
   this.userService.getUserProfile().subscribe(

    res => {
      this.userDetails = res["user"];
    },
    err => {
    }

  );
  }
   onSubmit(form: NgForm) {
    this.userService.sendMessage(form.value,this.user._id).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        form.resetForm();


      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>')
        }
        else {
          this.serverErrorMessages = err
        }

      }
    )

  }

}
