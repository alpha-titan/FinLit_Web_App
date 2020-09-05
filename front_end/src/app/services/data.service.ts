import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private api = 'https://query1.finance.yahoo.com/v8/finance/chart/{0}?region=US&lang=en-US&includePrePost=false&interval=2m&range=1d&.tsrc=finance';
  constructor(private httpClient: HttpClient) { }
  public getStockInformation(ticker){
    let api = this.api.replace('{0}', ticker);
    return this.httpClient.get(api);
}}
