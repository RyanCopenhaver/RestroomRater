import { Component,Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserAuthenticationService } from '../services/user-authentication.service';

@Component({
  selector: 'app-auth-guard',
  templateUrl: './auth-guard.component.html',
  styleUrls: ['./auth-guard.component.css']
})
@Injectable()
export class AuthGuard implements  CanActivate  {

  constructor(private router: Router, private authService: UserAuthenticationService) { }

  canActivate() {
    if(this.authService.isAuthenticated()) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  
  }

}
