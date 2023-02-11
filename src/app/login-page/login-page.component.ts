import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  
  eventIdForm = new UntypedFormGroup({
    eventId : new UntypedFormControl('')
  })

  constructor(private router: Router,
    private formBuilder: UntypedFormBuilder) {

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
