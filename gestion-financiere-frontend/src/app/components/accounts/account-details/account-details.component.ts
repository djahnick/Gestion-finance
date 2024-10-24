// src/app/components/accounts/account-details/account-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { TransactionService } from '../../../services/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountDialogComponent } from '../account-dialog/account-dialog.component';
import { TransactionDialogComponent } from '../../transactions/transaction-dialog/transaction-dialog.component';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  accountId!: number;
  account: any;
  transactions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private transactionService: TransactionService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.accountId = +this.route.snapshot.params['id'];
    this.getAccountDetails();
    this.getTransactions();
  }

  getAccountDetails() {
    this.accountService.getAccountById(this.accountId).subscribe(
      (data) => {
        this.account = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du compte', error);
      }
    );
  }

  getTransactions() {
    this.transactionService.getTransactions(this.accountId).subscribe(
      (data) => {
        this.transactions = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des transactions', error);
      }
    );
  }

  // Ajouter une transaction
  addTransaction() {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      data: { account_id: this.accountId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTransactions();
        this.getAccountDetails(); // Rafraîchir les détails du compte
      }
    });
  }

  // Modifier une transaction
  editTransaction(transaction: any) {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      data: { ...transaction, account_id: this.accountId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTransactions();
        this.getAccountDetails(); // Rafraîchir les détails du compte
      }
    });
  }

  // Supprimer une transaction
  deleteTransaction(id: number) {
    this.transactionService.deleteTransaction(id).subscribe(() => {
      this.getTransactions();
      this.getAccountDetails(); // Rafraîchir les détails du compte
    });
  }

  // Modifier le compte
  editAccount() {
    const dialogRef = this.dialog.open(AccountDialogComponent, {
      width: '400px',
      data: this.account,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAccountDetails();
      }
    });
  }
}
