import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { AuthLoginInfo } from '../classes/auth/auth-login-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	form: any = {};
	isLoggedIn = false;
	isLogginFailed = false;
	errorMessage= '';
	roles : string[] =[];
	private loginInfo:AuthLoginInfo;

  constructor(private authService:AuthService, private tokenStorage:TokenStorageService) { }

  ngOnInit() {
  	if(this.tokenStorage.getToken()){
  		this.isLoggedIn = true;
  		this.roles = this.tokenStorage.getAuthorities();
  	}
  }

  onSubmit(){
  	console.log(this.form);
  	this.loginInfo = new AuthLoginInfo(this.form.username,this.form.password);

  	this.authService.attemptAuth(this.loginInfo).subscribe(data => {
      console.log(data);
  		this.tokenStorage.saveToken(data.token);
  		this.tokenStorage.saveUserName(data.username);
  		this.tokenStorage.saveAuthorities(data.authorities);

  		this.isLogginFailed = false;
  		this.isLoggedIn = true;
  		this.roles = this.tokenStorage.getAuthorities();
      this.reloadPage();

  	},
  	error => {
  		console.log(error);
  		this.errorMessage = error.error.message;
  		this.isLogginFailed = true;
  	});
  }

  reloadPage(){
  	window.location.reload();
  }

}
