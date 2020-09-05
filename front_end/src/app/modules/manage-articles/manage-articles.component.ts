import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Article } from 'src/app/models/article.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manage-articles',
  templateUrl: './manage-articles.component.html',
  styleUrls: ['./manage-articles.component.scss']
})
export class ManageArticlesComponent implements OnInit {

  constructor(public userService:AuthService) { }
  userDetails;
  articles:Article[]
  ngOnInit() {
    this.userService.getUserProfile().subscribe(

      res => {
        this.userDetails = res["user"];
      },
      err => {
      }

    );
    this.userService.getArticles()
      .subscribe(articles => this.articles = articles)
      
  }
  getUsername(nom:String){
    var splitted = nom.split("@")[0];
    return splitted;
  }
  roleIsAdmin(){
    return this.userDetails.role=="Admin"
  }
  deleteArticle(id:String) {
    this.userService.deleteArticle(id).subscribe(data => {
        alert('Success');
    });
    window.location.reload()
}
roleIsAnalyst(){
  return this.userDetails.role=="Financial Analyst"
}
}
