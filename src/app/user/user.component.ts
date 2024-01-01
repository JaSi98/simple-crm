import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatCardModule, CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user: User = new User;
  users: User[] = [];
  unsubUsers;

  constructor(public dialog: MatDialog, private firestore: Firestore) {
    this.unsubUsers = this.subUsersList();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }

  subUsersList() {
    return onSnapshot(collection(this.firestore, 'users'), (list) => {
      this.users = [];
      list.forEach(user => {
        this.users.push(this.user.setUserObject(user.data(), user.id))
      });
      console.log('recieved Changes ', this.users)
    });
  }

  ngOnDestroy() {
    this.unsubUsers;
  }
}
