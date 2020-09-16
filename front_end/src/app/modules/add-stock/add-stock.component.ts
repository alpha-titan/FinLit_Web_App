import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {
  showSuccessMessage: boolean;
  serverErrorMessages: string
  constructor(public userService:AuthService, public router: Router) { }
  userDetails;
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(

      res => {
        this.userDetails = res["user"];
      },
      err => {
      }

    );
    
  }
  onSubmit(form: NgForm) {
    this.userService.addStock(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = true, 4000);
        form.resetForm();
        
        this.router.navigate(['/home/stocks']);


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
  roleIsAdmin(){
    return this.userDetails.role=="Admin"
  }
}
