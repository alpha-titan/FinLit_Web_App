import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private userService:AuthService) { }
  articles:Article[]
  ngOnInit(): void {
    this.userService.getArticles()
      .subscribe(articles => this.articles = articles)
      
  }
  getImageName(msg:any) {
    return "assets/images/"+msg.split("C:\\fakepath\\")[1];
  }
 
}
