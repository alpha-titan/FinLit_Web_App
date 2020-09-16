import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
const URL = 'http://localhost:3000/api/uploadImage';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });
  showSuccessMessage: boolean;
  serverErrorMessages: string
  constructor(public userService:AuthService, public router: Router,private toastr: ToastrService) { }
  userDetails;
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
    this.userService.postArticle(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = true, 4000);
        form.resetForm();
        
        this.router.navigate(['/home/posts']);


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
  roleIsAdmin(){
    return this.userDetails.role=="Admin"
  }
  roleIsAnalyst(){
    return this.userDetails.role=="Financial Analyst"
  }
}
