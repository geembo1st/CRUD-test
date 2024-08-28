import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router){}

  loginForm = new FormGroup ({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  loginUser() {
    const loginValue = this.loginForm.get('login')?.value;
    const passwordValue = this.loginForm.get('password')?.value;

    this.userService.getAll().subscribe(users => {
      const user = users.find(user => user.login === loginValue && user.password === passwordValue)
      if(user) {
        this.router.navigate(['app', 'users', user._id]);
      } else {
        alert('Неверный логин или пароль');
      }
    })
  }
}
 