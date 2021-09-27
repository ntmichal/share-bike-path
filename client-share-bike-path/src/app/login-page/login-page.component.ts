import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  
  eventIdForm = new FormGroup({
    eventId : new FormControl('')
  })

  constructor(private router: Router,
    private formBuilder: FormBuilder) {

    }

  ngOnInit(): void {
  }

  joinEvent(){
    var eventId = this.eventIdForm.get("eventId")?.value;
    this.navigateToUrlWithParam('mainapp',eventId);
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
