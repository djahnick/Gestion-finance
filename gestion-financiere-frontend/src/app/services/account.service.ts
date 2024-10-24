// src/app/services/account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:3000/finance/accounts';

  constructor(private http: HttpClient) {}

  // Récupère tous les comptes
  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Ajoute un nouveau compte
  addAccount(account: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, account);
  }

  // Supprime un compte
  deleteAccount(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Met à jour un compte
  updateAccount(id: number, account: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, account);
  }

  // Récupère un compte spécifique
  getAccountById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
