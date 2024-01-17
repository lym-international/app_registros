import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { AuthenticationService } from 'app/_services/authentication.service'; // Jairo

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { User } from 'app/_models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {

  data: any;

  constructor(
    private authService: AuthService, 
    private router: Router, 

    private authenticationService: AuthenticationService,//Jairo
    ) {}
    
   
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authenticationService.currentUser.pipe(
      take(1),
      map((user: User) => {
        if (user) {
          const userRole = user.role; // Ajusta esto al nombre correcto de la propiedad en tu User model
          if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
            this.router.navigate(['/authentication/signin']);
            return false;
          }
          return true;
        }

        this.router.navigate(['/authentication/signin']);
        return false;
       })
    );
  }
}