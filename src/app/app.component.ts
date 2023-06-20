import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AdminPanel';

  isMenuReq = false;
  isAdminUser = false;
  constructor(private router: Router, private service: AuthService) {}
}
