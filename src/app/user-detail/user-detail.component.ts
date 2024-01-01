import { Component } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  userId: string = '';
  user: User = new User;
  constructor(private route: ActivatedRoute, private firestore: Firestore) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id') ?? '';
      this.getUser();
    });
  }

  async getUser() {
    const docRef = doc(collection(this.firestore, 'users'), this.userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.user = this.user.setUserObject(docSnap.data(), this.userId);
    } else {
      console.error("No such User!");
    }
  }

  openAdressDialog() {
    
  }
}
