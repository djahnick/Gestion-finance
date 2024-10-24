// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AccountDialogComponent } from '../accounts/account-dialog/account-dialog.component';

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
      public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe(
        (data) => {
          this.accounts = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des comptes', error);
        }
    );
  }

  navigateToTransactions(accountId: number) {
    this.router.navigate(['/accounts', accountId, 'transactions']);
  }

  openAccountDialog(account?: any) {
    const dialogRef = this.dialog.open(AccountDialogComponent, {
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
    if (confirm('Voulez-vous vraiment supprimer ce compte ?')) {
      this.accountService.deleteAccount(id).subscribe(
          () => {
            this.getAccounts();
          },
          (error) => {
            console.error('Erreur lors de la suppression du compte', error);
          }
      );
    }
  }
}
