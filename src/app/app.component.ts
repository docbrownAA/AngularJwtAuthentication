import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority:string;

  constructor(private tokenStorage:TokenStorageService){}

  ngOnInit(){
  	if(this.tokenStorage.getToken()){
  		this.roles = this.tokenStorage.getAuthorities();
  		this.roles.every(role => {
        console.log(role);
  			if(role === 'ROLE_ADMIN'){
          console.log('là !')
  				this.authority = 'admin'
  				return false;
  			}else if (role == 'ROLE_PM'){
  				this.authority = 'pm';
  				return false;
  			}
  			this.authority = 'user';
  			return true;
  		});
  	}
  }
}
