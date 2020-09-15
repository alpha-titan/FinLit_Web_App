import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/app/models/message.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analyst-messages',
  templateUrl: './analyst-messages.component.html',
  styleUrls: ['./analyst-messages.component.scss']
})
export class AnalystMessagesComponent implements OnInit {
  constructor(private userService:AuthService,private router:Router) { }
  messages:Message[]
  userDetails;
  ngOnInit(): void {
    this.userService.getMessages()
      .subscribe(messages => this.messages = messages)
      this.userService.getUserProfile().subscribe(

        res => {
          this.userDetails = res["user"];
        },
        err => {
        }
  
      );
  }  deleteMessage(id:String) {
    this.userService.deleteMessage(id).subscribe(data => {
        alert('Success');
    });
    window.location.reload()
}
respond(id:String){
  this.router.navigate(['home/mymessages/respond/',id]);

}
  
}
