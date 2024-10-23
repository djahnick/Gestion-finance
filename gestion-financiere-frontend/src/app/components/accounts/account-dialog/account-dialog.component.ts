import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
})
export class AccountDialogComponent {
  accountForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private dialogRef: MatDialogRef<AccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data;

    this.accountForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      initial_balance: [{ value: data?.balance || 0, disabled: this.isEditMode }, Validators.required],
      currency: [{ value: data?.currency || 'EUR', disabled: this.isEditMode }, Validators.required],
      description: [data?.description || ''],
    });
  }

  saveAccount() {
    if (this.accountForm.valid) {
      if (this.isEditMode) {
        this.accountService
          .updateAccount(this.data.id, this.accountForm.getRawValue())  // Utiliser getRawValue() pour inclure les champs désactivés
          .subscribe(
            () => {
              this.dialogRef.close(true);
            },
            (error) => {
              console.error('Erreur lors de la mise à jour du compte', error);
            }
          );
      } else {
        this.accountService.addAccount(this.accountForm.value).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Erreur lors de la création du compte', error);
          }
        );
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
