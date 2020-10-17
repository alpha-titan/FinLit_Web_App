import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {

  stockDetails;
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  userDetails;
  constructor(private route: ActivatedRoute,public userService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      return  this.userService.getStock(params['_id']); }))
   .subscribe(stock => { this.stockDetails = stock['stock'];  })
   this.userService.getUserProfile().subscribe(

    res => {
      this.userDetails = res["user"];
    },
    err => {
    }

  );
  }

}
