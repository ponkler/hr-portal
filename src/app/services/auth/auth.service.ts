import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private loggedIn = new BehaviorSubject<boolean | null>(null);
  private roles = new BehaviorSubject<string[]>([]);

  public loggedInObservable = this.loggedIn.asObservable();
  public rolesObservable = this.roles.asObservable();

  constructor() {}

  register(employeeId: number | null, isAdmin: boolean) {
    if (employeeId) {
      return this.http.post<{ message: string, userId: number, role: string }>('https://localhost:7290/api/auth/register', {
        employeeId,
        isAdmin
      }, { withCredentials: true });
    } else {
      console.error('No employeeId provided');
      return;
    }
  }

  login(email: string | null, password: string | null) {
    return this.http.post<{ message: string }>('https://localhost:7290/api/auth/login', {
        email,
        password,
      }, { withCredentials: true })
      .pipe(
        tap((response) => {
          this.loggedIn.next(true);
          this.fetchRoles();
        })
      )
  }

  checkLogin() {
    this.http.get<{ isAuthenticated: boolean }>('https://localhost:7290/api/auth/check', { withCredentials: true })
      .subscribe({
        next: (response) => {
          this.loggedIn.next(response.isAuthenticated);
        },
        error: (err) => {
          this.loggedIn.next(false);
        }
      });
  }

  fetchRoles() {
    this.http.get<string[]>('https://localhost:7290/api/auth/roles', { withCredentials: true })
      .pipe(
        tap(roles => this.roles.next(roles))
      ).subscribe();
  }

  logout() {
    return this.http.post<{message: string}>(
      'https://localhost:7290/api/auth/logout', 
      {}, 
      { withCredentials: true }
    ).pipe(
      tap(response => {
        this.loggedIn.next(false);
        this.roles.next([]);
        this.router.navigate(['/login']);
      })
    )
  }
}
