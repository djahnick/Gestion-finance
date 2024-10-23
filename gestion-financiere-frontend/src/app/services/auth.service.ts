// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); // État de l'authentification

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token); // Stocke le token
          this.isAuthenticatedSubject.next(true); // Notifie les abonnés que l'utilisateur est connecté
        })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false); // Notifie les abonnés que l'utilisateur est déconnecté
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Observable pour suivre les changements d'authentification
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
