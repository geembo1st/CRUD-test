import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, mergeMap } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../user.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  user: User | null = null;
  updateForm !: FormGroup;

  constructor(private userService:UserService, private route:ActivatedRoute, private router: Router){
  }
 
  ngOnInit() {
    this.routeSub = this.route.params.pipe(
      mergeMap(({ userId }) => this.userService.get(userId))
    ).subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.initializeForm();
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  initializeForm() {
    if (this.user) {
      this.updateForm = new FormGroup({
        age: new FormControl(this.user.age, [Validators.min(18)]),
        name: new FormControl(this.user.name, [Validators.required]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email])
      });
    } 
  }
  
  updateUser() {
    if (this.updateForm.valid && this.user) {
      const updatedUser: User = {
        _id: this.user._id,
        name: this.updateForm.value.name || this.user.name,
        email: this.updateForm.value.email || this.user.email,
        age: this.updateForm.value.age !== null ? this.updateForm.value.age : this.user.age
      };
      this.userService.update(updatedUser).subscribe(() => { 
        this.router.navigate(['users', 'list']);
      });
    } else {
      console.error('Форма недействительна или пользователь не найден для обновления');
    }
  }
}
