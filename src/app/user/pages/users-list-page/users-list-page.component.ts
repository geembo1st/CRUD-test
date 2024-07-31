import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.css'
})
export class UsersListPageComponent {
  constructor(private userService:UserService){
    this.userService.getAll().subscribe((users) => {
      this.users=users;
    });
  }

  users:User[] = [];
}
