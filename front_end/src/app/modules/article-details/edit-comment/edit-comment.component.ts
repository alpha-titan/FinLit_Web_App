import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {

  constructor(private route: ActivatedRoute,public userService: AuthService, public router: Router) { }

  showSuccessMessage: boolean;
  userDetails;
  commentDetails;
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
      return  this.userService.getComment(params['_id']); }))
   .subscribe(comment => { this.commentDetails = comment['comment'];  })
   

  
   this.route.params.pipe(switchMap((params: Params) => {
    return  this.userService.getArticle(params['_id']); }))
 .subscribe(article => { this.articleDetails = article['article'];  })
   

  }
  
 
  onSubmit(form: NgForm) {
    this.userService.updateComment(form.value, this.commentDetails._id).subscribe(
      res => {

        form.resetForm();
        
        window.location.reload()


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
