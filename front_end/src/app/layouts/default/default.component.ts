import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;

  constructor(public userService:AuthService) { }

  ngOnInit(): void {
  }
  
  sideBarToggler(sideBarOpen) {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
