import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription, mergeMap, takeUntil, tap } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  user: User | null = null;

  user$!: Observable<User>

  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl<null | number>(null, [Validators.min(18), Validators.required])
  });

  constructor(
    private userService:UserService,
    private route:ActivatedRoute,
    private router: Router,
  ){
    this.user$ = this.route.params.pipe(
      takeUntil(this.destroy$),
      mergeMap(({ userId }) => this.userService.get(userId)),
      tap((user) => {
        this.user = user;
        this.updateForm.setValue({
          name: user.name,
          age: user.age,
          email: user.email,
        });
      }),
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  updateUser() {
    if (this.updateForm.valid && this.user) {
      const formValue = this.updateForm.value as Omit<User, '_id'>;
      const updatedUser: User = {
        _id: this.user._id,
        ...formValue,
      };
      this.userService.update(updatedUser).subscribe(() => { 
        this.router.navigate(['users', 'list']);
      });
    } else {
      console.error('Форма недействительна или пользователь не найден для обновления');
    }
  }
}


/**
 * 1) Релизовать Resolver, он будет считывать UserId из параметров роутера, получать пользователя
 */