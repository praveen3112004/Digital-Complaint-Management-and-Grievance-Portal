import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.user) {
          localStorage.setItem(this.currentUserKey, JSON.stringify(response.user));
          // Store simplified headers for "Secure" requests
          localStorage.setItem('x-user-id', response.user.id);
          localStorage.setItem('x-user-role', response.user.role);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    localStorage.removeItem('x-user-id');
    localStorage.removeItem('x-user-role');
  }

  getUser(): any {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.currentUserKey);
  }

  getRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  getStaff(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/staff`);
  }
}
