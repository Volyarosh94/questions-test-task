import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenPair, User } from '../interfaces';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  private authUrl: string = '/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(userData: User) {
    return this.http.post(`${this.apiUrl + this.authUrl}/sign-up`, userData)
  }

  login(userData: User): Observable<any> {
    return this.http.post(`${this.apiUrl + this.authUrl}/sign-in`, userData);
  }

  saveToken(token: TokenPair): void {
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['auth/login']);
    this.updateAuthStatus(false);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<any>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.accessToken);
      })
    );
  }

  updateAuthStatus(status: boolean): void {
    this.isAuthenticatedSubject.next(status);
  }
}
