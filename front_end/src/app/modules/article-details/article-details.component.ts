import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  articleDetails;
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  userDetails;
  constructor(private route: ActivatedRoute,public userService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      return  this.userService.getArticle(params['_id']); }))
   .subscribe(article => { this.articleDetails = article['article'];  })
   this.userService.getUserProfile().subscribe(

    res => {
      this.userDetails = res["user"];
    },
    err => {
    }

  );
  }
  getImageName(msg:any) {
    return "assets/images/"+msg.split("C:\\fakepath\\")[1];
  }
  onSubmit(form: NgForm) {
    this.userService.addComment(form.value,this.articleDetails._id).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = true, 4000);
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
  getUsername(msg:String){
    return msg.split('@')[0];
  }
  deleteComment(id:String) {
    this.userService.deleteComment(id).subscribe(data => {
        alert('Comment Deleted');
    });
    window.location.reload()
}
}
