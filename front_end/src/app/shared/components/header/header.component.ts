import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(public userService:AuthService,public router:Router) { }
  userDetails;
  ngOnInit(): void {this.userService.getUserProfile().subscribe(

    res => {
      this.userDetails = res["user"];
    },
    err => {
    }

  );
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }


}
