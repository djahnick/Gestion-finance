// src/app/services/account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {
  private apiUrl = 'http://localhost:3000/finance/accounts';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAccountById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addAccount(account: any): Observable<any> {
    return this.http.post(this.apiUrl, account);
  }

  updateAccount(id: number, account: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, account);
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
