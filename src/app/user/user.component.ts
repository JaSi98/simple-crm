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
        this.users.push(this.setUserObject(user.data(), user.id))
      });
      console.log('recieved Changes ', this.users)
    });
  }

  ngOnDestroy() {
    this.unsubUsers;
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Monate sind 0-basiert
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}


  setUserObject(user: any, id: any): User {
    return new User({
      id: id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthDate: this.formatDate(user.birthDate),
      street: user.street,
      zipCode: user.zipCode,
      city: user.city
    });
  }
}
