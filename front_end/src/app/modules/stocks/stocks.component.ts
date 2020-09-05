
import { Component, OnInit } from '@angular/core';
import {TickerInfoComponent} from './ticker-info/ticker-info.component'
import { from } from 'rxjs';
@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  stocks = [ 
    { symbol: 'TSLA', name: 'Tesla, Inc.'},
    { symbol: 'MSFT', name: 'Microsoft Corporation'},
    { symbol: 'SPCE', name: 'Virgin Galactic'},
    { symbol: 'CVS', name: 'CVS Pharmacy'},
  ];
  constructor() { }
  selectedStock:String;

  ngOnInit(): void {
  }

}
