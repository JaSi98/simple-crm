import { Component } from '@angular/core';
import { Firestore, collection, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditGeneralInfoComponent } from '../dialog-edit-general-info/dialog-edit-general-info.component';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  userId: string = '';
  user: User = new User;
  unsubUser?: () => void;
  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id') ?? '';
      this.getUser();
    });
  }

  getUser() {
    const docRef = doc(collection(this.firestore, 'users'), this.userId);

    this.unsubUser = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        this.user = this.user.setUserObject(docSnap.data(), this.userId);
      } else {
        console.error("No such user!");
      }
    });
  }

  editGeneralInfo() {
    const dialog = this.dialog.open(DialogEditGeneralInfoComponent);
    dialog.componentInstance.user = new User(this.user.getCleanJson(this.user));
  }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.getCleanJson(this.user));
  }

  deleteUser() {
    const dialog = this.dialog.open(DialogDeleteUserComponent);
    dialog.componentInstance.user = this.user;
  }
}
