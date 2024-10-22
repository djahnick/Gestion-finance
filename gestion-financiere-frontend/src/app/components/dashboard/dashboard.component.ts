// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AccountsComponent } from '../accounts/accounts.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  accounts: any[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;
    });
  }
  navigateToTransactions(accountId: number) {
    this.router.navigate(['/accounts', accountId, 'transactions']);
  }

  openAccountDialog(account?: any) {
    const dialogRef = this.dialog.open(AccountsComponent, {
      width: '400px',
      data: account ? account : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAccounts();
      }
    });
  }

  deleteAccount(id: number) {
    this.accountService.deleteAccount(id).subscribe(() => {
      this.getAccounts();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
