import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AddUserData } from '../../models/add-user-data';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StringListComponent } from '../../../shared/string-list/string-list.component';
import { Roles } from '../../../shared/string-list/roles.enum'; 

@Component({
  selector: 'app-user-create-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, StringListComponent],
  templateUrl: './user-create-page.component.html',
  styleUrl: './user-create-page.component.css'
})
export class UserCreatePageComponent {
  [x: string]: any;
  availableRoles = Object.values(Roles);
  constructor(private userService: UserService, private router: Router){}
  
  myForm = new FormGroup ({
    age: new FormControl(null, [Validators.min(18)]),
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    userRoles: new FormControl<string[]>([]),
  })

  createUser() {
    if (this.myForm.valid) {
      const addUserData: AddUserData = {
        age: this.myForm.value.age!,
        name: this.myForm.value.name!,
        login: this.myForm.value.login!,
        password: this.myForm.value.password!,
        userRoles: this.myForm.value.userRoles!
      };
      this.userService.create(addUserData).subscribe((user) => { 
        this.router.navigate(['app','users',user._id])
      })
    }
  }
}