import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-investing',
  templateUrl: './investing.component.html',
  styleUrls: ['./investing.component.scss']
})
export class InvestingComponent implements OnInit {

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
