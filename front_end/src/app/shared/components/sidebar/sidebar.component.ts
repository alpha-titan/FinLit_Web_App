import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
const URL = 'http://localhost:3000/api/uploadImage';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });

  constructor(public userService: AuthService, public router: Router,private toastr: ToastrService) { }
  userDetails;
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(

      res => {
        this.userDetails = res["user"];
      },
      err => {
      }

    );this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
  }
  getImageName() {
    return this.userDetails.image.split("C:\\fakepath\\")[1];
  }

    getUsername(){
      if(this.userDetails){
      var splitted = this.userDetails.email.split("@")[0];
      return splitted;}
    }

    roleIsAdmin(){if(this.userDetails.role){
      return this.userDetails.role=="Admin"}
    }
    roleIsAnalyst(){
      if(this.userDetails.role){
      return this.userDetails.role=="Financial Analyst"}
    }
}
