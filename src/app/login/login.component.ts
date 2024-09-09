import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../core/service/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router){}

  loginForm = new FormGroup ({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  }) 

  loginUser() {
    const { login, password } = this.loginForm.value;
    if (!login?.trim() || !password?.trim()) {
      return;
    }
    this.authService.auth(login, password).subscribe((user) =>{ 
      if(!user) {
        alert('Неверный логин или пароль');
        return;
      }
      this.router.navigate(['app', 'users', user._id]);
    })
  }
}
 