import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AddUserData } from '../../models/add-user-data';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StringListComponent } from '../../../shared/string-list/string-list.component';

@Component({
  selector: 'app-user-create-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, StringListComponent],
  templateUrl: './user-create-page.component.html',
  styleUrl: './user-create-page.component.css'
})
export class UserCreatePageComponent {
  [x: string]: any;
  constructor(private userService: UserService, private router: Router){}
  
  myForm = new FormGroup ({
    age: new FormControl(null, [Validators.min(18)]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    favoriteBooks: new FormControl<string[]>([]),
  })

  createUser() {
    if (this.myForm.valid) {
      const addUserData: AddUserData = {
        age: this.myForm.value.age!,
        name: this.myForm.value.name!,
        email: this.myForm.value.email!,
        favoriteBooks: this.myForm.value.favoriteBooks!
      };
      this.userService.create(addUserData).subscribe((user) => { 
        this.router.navigate(['users',user._id])
      })
    }
  }
}