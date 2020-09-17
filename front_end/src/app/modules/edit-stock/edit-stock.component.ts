import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.scss']
})
export class EditStockComponent implements OnInit {
  constructor(private route: ActivatedRoute,public userService: AuthService, public router: Router) { }
  

  showSuccessMessage: boolean;
  userDetails;
  stockDetails
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
      return  this.userService.getStock(params['_id']); }))
   .subscribe(stock => { this.stockDetails = stock['stock'];  })
   



  }
  onSubmit(form: NgForm) {
    this.userService.updateStock(form.value, this.stockDetails._id).subscribe(
      res => {

        form.resetForm();

        this.router.navigate(['home/stocks']);


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

