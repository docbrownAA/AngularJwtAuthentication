import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';
import { SignUpInfo } from '../classes/auth/sign-up-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	form:any = {};
	signupInfo:SignUpInfo;
	isSignedUp = false;
	isSignedUpFailed = false;
	errorMessage = '';
  constructor(private authService:AuthService) { }

  ngOnInit() {  }

  onSubmit(){
  	console.log(this.form);

  	this.signupInfo = new SignUpInfo(this.form.name,
  		this.form.username,
  		this.form.email,
  		this.form.password);

  	this.authService.signUp(this.signupInfo).subscribe(data => {
  		console.log(data);
  		this.isSignedUp = true;
  		this.isSignedUpFailed = false;
  	},error=> {
  		console.log(error);
  		this.isSignedUp = false;
  		this.isSignedUpFailed = true;
  		this.errorMessage = error.error.message;
  	});
  }

}
