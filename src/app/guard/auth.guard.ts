import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private service: AuthService,
    private router: Router,
    private tostr: ToastrService,
    private snackBar: MatSnackBar
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if (this.service.isloggedIn()) {
        if (route.url.length > 0) {
          let menu = route.url[0].path;
          if (menu == 'user') {
            if (this.service.getUserRole() == 'admin') {
              return true;
            } else {
              this.router.navigate(['home']);
              
                this.snackBar.open("Sorry you dont have access!" , 'Close', {
                  horizontalPosition: this.horizontalPosition,
                 verticalPosition: this.verticalPosition,
                 
                })
              return false;
            }
          }else{
            return true;
          }
        } else {
          return true;
        }
      }
    else {
      this.router.navigate(['login']);
      return false;
    }
    
  }
}
