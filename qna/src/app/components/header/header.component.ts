import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./styles/_import.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.asObservable().subscribe((status) => {
      this.isAuthenticated = status || !!localStorage.getItem('accessToken');
    })
  }

  logout(): void {
    this.authService.logout();
  }
}
