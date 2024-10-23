import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDialogComponent } from './transaction-dialog/transaction-dialog.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  accountId!: number;
  transactions: any[] = [];

  constructor(
      private transactionService: TransactionService,
      private route: ActivatedRoute,
      public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.accountId = +this.route.snapshot.params['id'];
    this.getTransactions();
  }

  getTransactions() {
    this.transactionService
        .getTransactions(this.accountId)
        .subscribe((data) => {
          this.transactions = data;
        });
  }

  openTransactionDialog(transaction?: any) {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      data: transaction
          ? { ...transaction, account_id: this.accountId }
          : { account_id: this.accountId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTransactions();
      }
    });
  }

  deleteTransaction(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette transaction ?')) {
      this.transactionService.deleteTransaction(id).subscribe(
          () => {
            this.getTransactions();
          },
          (error) => {
            console.error('Erreur lors de la suppression de la transaction', error);
          }
      );
    }
  }
}
