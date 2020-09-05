import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit {

 
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

