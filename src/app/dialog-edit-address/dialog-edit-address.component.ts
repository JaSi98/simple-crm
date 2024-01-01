import { Component, importProvidersFrom } from '@angular/core';
import { doc, setDoc } from "firebase/firestore"; 
import { Firestore, addDoc } from '@angular/fire/firestore';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { collection } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogEditAddressComponent> ) {

  }
  user: User = new User;
  loading: boolean = false;
  

  async saveUser() {
    this.loading = true;
    const docRef = await addDoc(this.getUserRef(), this.user.getCleanJson(this.user)).catch (
      (err) => { console.error(err) }
    );
    this.loading = false;
    this.dialogRef.close();
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }
}