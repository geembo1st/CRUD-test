import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { AddUserData } from '../../models/add-user-data';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-create-page.component.html',
  styleUrl: './user-create-page.component.css'
})
export class UserCreatePageComponent {
  constructor(private userService: UserService, private router: Router){}

  addUserData: AddUserData = {
    age: 0,
    name: '',
    email: ''
  }

  createUser() {
    this.userService.create(this.addUserData).subscribe(() => { 
      this.router.navigate(['users','list'])
    })
  }
}
