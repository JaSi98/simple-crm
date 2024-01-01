import { Component } from '@angular/core';
import { doc } from "firebase/firestore"; 
import { Firestore, deleteDoc, updateDoc } from '@angular/fire/firestore';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-delete-user',
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
  templateUrl: './dialog-delete-user.component.html',
  styleUrl: './dialog-delete-user.component.scss'
})
export class DialogDeleteUserComponent {
  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogDeleteUserComponent>, private router: Router) {
  }
  user: User = new User;
  loading: boolean = false;

  async deleteUser() {
    this.loading = true;
    const docRef = doc(collection(this.firestore, 'users'), this.user.id);
    await deleteDoc(docRef).catch(
      (err) => { console.error(err); }
    )
    this.loading = false;
    this.dialogRef.close();
    this.router.navigate(['/user']);
  }
}
