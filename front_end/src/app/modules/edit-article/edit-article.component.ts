import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from '../../services/auth.service';

import { Router, Params, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
const URL = 'http://localhost:3000/api/uploadImage';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  constructor(private route: ActivatedRoute,public userService: AuthService, public router: Router,private toastr: ToastrService) { }
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });

  showSuccessMessage: boolean;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  userDetails;
  articleDetails
  serverErrorMessages: String;
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(

      res => {
        this.userDetails = res["user"];
      },
      err => {
      }

    );
    this.route.params.pipe(switchMap((params: Params) => {
      return  this.userService.getArticle(params['_id']); }))
   .subscribe(article => { this.articleDetails = article['article'];  })
   

  

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };

  }
  onSubmit(form: NgForm) {
    this.userService.updateArticle(form.value, this.articleDetails._id).subscribe(
      res => {

        form.resetForm();

        this.router.navigate(['/articles']);


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
