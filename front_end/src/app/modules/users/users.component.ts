import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  searchText;
  constructor(private userService:AuthService) { }
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
  getUsername(nom:String){
    var splitted = nom.split("@")[0];
    return splitted;
  }
  roleIsAdmin(){
    return this.userDetails.role=="Admin"
  }
  deleteUser(id:String) {
    this.userService.deleteUser(id).subscribe(data => {
        alert('Success');
    });
    window.location.reload()
}

}
