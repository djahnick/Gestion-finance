// src/app/components/accounts/accounts.component.ts
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent {
  accountForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private dialogRef: MatDialogRef<AccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data;

    this.accountForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      initial_balance: [data?.initial_balance || 0, Validators.required],
      currency: [data?.currency || 'EUR', Validators.required],
      description: [data?.description || ''],
    });
  }

  saveAccount() {
    if (this.accountForm.valid) {
      if (this.isEditMode) {
        this.accountService
          .updateAccount(this.data.id, this.accountForm.value)
          .subscribe(() => {
            this.dialogRef.close(true);
          });
      } else {
        this.accountService.addAccount(this.accountForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
