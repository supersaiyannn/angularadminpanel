import { Component, DoCheck } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements DoCheck {
  isMenuReq = false;
  isAdminUser = false;
  constructor(private router: Router, private service: AuthService) {}
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl == '/login' || currentUrl == '/register') {
      this.isMenuReq = false;
    } else {
      this.isMenuReq = true;
    }
    if (this.service.getUserRole() === 'admin') {
      this.isAdminUser = true;
    } else {
      this.isAdminUser = false;
    }
  }
}
