import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from '../../classes/auth/jwt-response';
import { AuthLoginInfo } from '../../classes/auth/auth-login-info';
import { SignUpInfo } from '../../classes/auth/sign-up-info';

const httpOptions = {
	headers:new HttpHeaders({'Content-type':'application/json'})
}

@Injectable()
export class AuthService {
	private loginUrl = 'http://localhost:8080/api/auth/signin';
	private signupUrl = 'http://localhost:8080/api/auth/signup';
  constructor(private http: HttpClient) { }

  attemptAuth(credentials: AuthLoginInfo):Observable<JwtResponse>{
  	return this.http.post<JwtResponse>(this.loginUrl,credentials,httpOptions);
  }

  signUp(info:SignUpInfo):Observable<string>{
  	return this.http.post<string>(this.signupUrl,info,httpOptions);
  }

}
