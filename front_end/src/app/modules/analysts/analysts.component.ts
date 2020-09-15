import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-analysts',
  templateUrl: './analysts.component.html',
  styleUrls: ['./analysts.component.scss']
})
export class AnalystsComponent implements OnInit {

  constructor(private route: ActivatedRoute,public userService: AuthService, public router: Router) { }
  users:User[]
  userDetails;
  ngOnInit() {
    this.userService.getUserProfile().subscribe(

      res => {
        this.userDetails = res["user"];
      },
      err => {
      }

    );
    this.userService.getUsers()
      .subscribe(users => this.users = users)
  }
 
  roleIsAdmin(){
    return this.userDetails.role=="Admin"
  }
  roleIsAnalyst(){
    return this.userDetails.role=="Financial Analyst"
  }
  deleteUser(id:String) {
    this.router.navigate(['home/message/',id]);  
}
}
