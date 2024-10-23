import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../../services/transaction.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
})
export class TransactionDialogComponent {
  transactionForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
      private fb: FormBuilder,
      private transactionService: TransactionService,
      private dialogRef: MatDialogRef<TransactionDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data.id;

    this.transactionForm = this.fb.group({
      account_id: [data.account_id, Validators.required],
      type: [data?.type || 'expense', Validators.required],
      amount: [data?.amount || 0, Validators.required],
      date: [data?.date || new Date(), Validators.required],
      description: [data?.description || ''],
    });
  }

  saveTransaction() {
    if (this.transactionForm.valid) {
      if (this.isEditMode) {
        this.transactionService
            .updateTransaction(this.data.id, this.transactionForm.value)
            .subscribe(() => {
              this.dialogRef.close(true);
            });
      } else {
        this.transactionService
            .addTransaction(this.transactionForm.value)
            .subscribe(() => {
              this.dialogRef.close(true);
            });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
