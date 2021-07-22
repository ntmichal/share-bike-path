import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  joinEvent(){
    this.navigateToUrlWithParam('mainapp',99);
  }

  createEvent(){
    this.navigateToUrl('mainapp');
  }

  navigateToUrl(url:String){
    this.router.navigate([url]);
  }

  navigateToUrlWithParam(url:String, queryParam:any){
    this.router.navigate([url], { queryParams: { eventId: queryParam } })
  }
}
