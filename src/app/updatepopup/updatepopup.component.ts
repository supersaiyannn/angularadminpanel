import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css'],
})
export class UpdatepopupComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tostr: ToastrService,
    private snackBar: MatSnackBar,
    private dialog: MatDialogRef<UpdatepopupComponent>
  ) {}
  editData: any;

  ngOnInit(): void {
    this.service.getAllRole().subscribe((res) => {
      this.rolelist = res;
    });
    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.getByCode(this.data.usercode).subscribe((res) => {
        this.editData = res;

        this.registerForm.setValue({
          id: this.editData.id,
          name: this.editData.name,
          email: this.editData.email,
          phone: this.editData.phone,
          password: this.editData.password,
          role: this.editData.role,
          gender: this.editData.gender,
          isActive: this.editData.isActive,
        });
      });
    }
  }
  rolelist: any;

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

  updateUser() {
    if (this.registerForm.valid) {
      this.service
        .updateUser(this.registerForm.value.id, this.registerForm.value)
        .subscribe((res) => {
          this.snackBar.open(
            `${this.registerForm.value.id}-Updated Successfully!`,
            'Close',
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            }
          );
          this.dialog.close();
        });
    } else {
      this.snackBar.open('Please Select Role!', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
