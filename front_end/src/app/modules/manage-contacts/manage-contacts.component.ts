import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Article } from 'src/app/models/article.model';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-manage-contacts',
  templateUrl: './manage-contacts.component.html',
  styleUrls: ['./manage-contacts.component.scss']
})
export class ManageContactsComponent implements OnInit {

 
  constructor(public userService:AuthService) { }
  userDetails;
  contacts:Contact[]
  ngOnInit() {
    this.userService.getUserProfile().subscribe(

      res => {
        this.userDetails = res["user"];
      },
      err => {
      }

    );
    this.userService.getContacts()
      .subscribe(contacts => this.contacts = contacts)
      
  }
  
  roleIsAdmin(){
    return this.userDetails.role=="Admin"
  }
 
}
