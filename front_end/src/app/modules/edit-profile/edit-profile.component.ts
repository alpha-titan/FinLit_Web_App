import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
const URL = 'http://localhost:3000/api/uploadImage';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });

  showSuccessMessage: boolean;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  userDetails;
  serverErrorMessages: String;
 

  constructor(public userService: AuthService, public router: Router,private toastr: ToastrService) { }
  ngOnInit(): void {
    
    this.userService.getUserProfile().subscribe(

      res => {
        this.userDetails = res["user"];
      },
      err => {
      }

    );
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };


  }
  onSubmit(form: NgForm) {
    this.userService.updateUser(form.value, this.userDetails._id).subscribe(
      res => {

        form.resetForm();
        location.reload();

        this.router.navigate(['/home']);


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
