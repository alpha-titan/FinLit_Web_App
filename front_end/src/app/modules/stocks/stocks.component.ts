
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Stock } from 'src/app/models/stock.model';
@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  
  constructor(private userService:AuthService) { }
  stocks:Stock[]
  userDetails;
  ngOnInit() {
    this.userService.getUserProfile().subscribe(

      res => {
        this.userDetails = res["user"];
      },
      err => {
      }

    );
    this.userService.getStocks()
      .subscribe(stocks => this.stocks = stocks)
  }

  roleIsAdmin(){
    return this.userDetails.role=="Admin"
  }
  deleteStock(id:String) {
    this.userService.deleteStock(id).subscribe(data => {
        alert('Success');
    });
    window.location.reload()
}


}
