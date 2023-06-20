import { Component, OnInit, Inject ,ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    private snackBar: MatSnackBar,
    private dialog: MatDialogRef<DeletePopupComponent>
  ) {}


  editData: any;
  code:any;
  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loadUser() {
    this.service.getAll().subscribe((res) => {
      this.userList = res;
     
    });
  }

  registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    phone: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isActive: this.builder.control(false),
  });

  removeUser(code:any) {
  
      this.service.removeUser(code).subscribe(res=>{
            this.snackBar.open(`${this.registerForm.value.id}-Removed Successfully!`, 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.dialog.close();
     
               })
               };
  
      

     
    
          
        
      
     
          

}
