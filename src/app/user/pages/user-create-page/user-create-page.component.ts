import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';
import { AddUserData } from '../../models/add-user-data';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-create-page.component.html',
  styleUrl: './user-create-page.component.css'
})
export class UserCreatePageComponent {
  [x: string]: any;
  constructor(private userService: UserService, private router: Router){}
  
  myForm = new FormGroup ({
    age: new FormControl(null, [Validators.min(18)]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  })

  createUser() {
    if (this.myForm.valid) {
      const addUserData: AddUserData = {
        age: this.myForm.value.age!,
        name: this.myForm.value.name!,
        email: this.myForm.value.email!
      };
      this.userService.create(addUserData).subscribe(() => { 
        this.router.navigate(['users','list'])
      })
    }
  }
}
