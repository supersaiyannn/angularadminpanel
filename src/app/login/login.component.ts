import { Component } from '@angular/core';
import {FormBuilder,Validators} from "@angular/forms"
import { Router } from '@angular/router';
import {ToastrService} from "ngx-toastr"
import { AuthService } from '../service/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private builder:FormBuilder  ,private service:AuthService,
    private router: Router,private tostr:ToastrService ,private snackBar: MatSnackBar
    ){

  sessionStorage.clear();
  }
  
  userData:any;

loginForm = this.builder.group({
  userName:this.builder.control("",Validators.compose([Validators.required])),
  userPassword:this.builder.control("",Validators.compose([Validators.required])),
});

proceedLogin(){
  if(this.loginForm.valid &&  this.loginForm.touched ){
this.service.getByCode(this.loginForm.value.userName).subscribe(res=>{
  this.userData =res;
  //console.log(this.userData)

if(this.userData.password===this.loginForm.value.userPassword){
if(this.userData.isActive){
sessionStorage.setItem("userName",this.userData.id);

sessionStorage.setItem("userRole",this.userData.role);
this.router.navigate(["home"]);

this.snackBar.open(`Welcome ${this.userData.id}!!` ,'Close', {
  horizontalPosition: this.horizontalPosition,
 verticalPosition: this.verticalPosition,
 
})
}else{
 
  this.snackBar.open(`Please Contact Admin! (In-Active User!)` , 'Close', {
    horizontalPosition: this.horizontalPosition,
   verticalPosition: this.verticalPosition,
   
  })
}
}else {
  
  this.snackBar.open("Invalid Credentials!" , 'Close', {
    horizontalPosition: this.horizontalPosition,
   verticalPosition: this.verticalPosition,
   
  })
}
if(this.loginForm.invalid && this.loginForm.touched){
  
  this.snackBar.open("Invalid User!" , 'Close', {
    horizontalPosition: this.horizontalPosition,
   verticalPosition: this.verticalPosition,
   
  })
}

});
}


}
}
