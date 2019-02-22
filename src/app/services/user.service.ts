import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
	private userUrl = 'http://localhost:8080/api/test/user';
	private pmURL = 'http://localhost:8080/api/test/pm'
	private adminURL = 'http://localhost:8080/api/test/admin'

	constructor(private http: HttpClient) { }

	getUserBoard(): Observable<string> {
		return this.http.get(this.userUrl, { responseType: 'text' });
	}

	getPmBOard(): Observable<string> {
		return this.http.get(this.pmURL, { responseType: 'text' });
	}

	getAdminBOard(): Observable<string> {
		return this.http.get(this.adminURL, { responseType: 'text' });
	}	

}
