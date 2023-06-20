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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
constructor(private builder:FormBuilder  ,private service:AuthService,
  private router: Router,private tostr:ToastrService ,private snackBar: MatSnackBar
  ){

};


registerForm = this.builder.group({
  id:this.builder.control("",Validators.compose([Validators.required,Validators.minLength(5)])),
  name:this.builder.control("",Validators.compose([Validators.required,Validators.minLength(4)])),
  password:this.builder.control("",Validators.compose([Validators.required,Validators.pattern
    ("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])),
  email:this.builder.control("",Validators.compose([Validators.required,Validators.email])),
  phone:this.builder.control("",Validators.compose([Validators.required,Validators.pattern("[7-9]{1}[0-9]{9}")])),
  gender:this.builder.control("male"),
  role:this.builder.control(""),
  isActive:this.builder.control(false),
});


proceedRegistration(){
  if(this.registerForm.valid &&  this.registerForm.touched){
this.service.proceedRegister(this.registerForm.value).subscribe(res=>{
 
 this.snackBar.open(`Registered SuccessFully! (please contact admin for enable access!)` , 'Close', {
   horizontalPosition: this.horizontalPosition,
  verticalPosition: this.verticalPosition,
  
 })
this.router.navigate(["login"]);
});
  }else{
    
    this.snackBar.open('Please Enter Valid Data!!', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
  }
}

}
