import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StringListComponent } from '../../../shared/string-list/string-list.component';
import { Roles } from '../../../shared/roles.enum';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, StringListComponent],
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  availableRoles = Object.values(Roles);
  user!: User;

  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    age: new FormControl<null | number>(null, [Validators.min(18), Validators.required]),
    userRoles: new FormControl<string[]>([]),
  });

  constructor(
    private userService:UserService,
    private route:ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.route.data
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.user = data['user'];
        this.updateForm.setValue({
          name: this.user.name,
          age: this.user.age,
          login: this.user.login,
          password: this.user.password,
          userRoles: this.user.userRoles || [],
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  updateUser() {
    console.log(this.updateForm.valid);
    console.log(this.updateForm.value);
    if (this.updateForm.invalid || !this.user) {
      console.error('Форма недействительна или пользователь не найден для обновления');
      return;
    }
    const formValue = this.updateForm.value as Omit<User, '_id'>;
    const updatedUser: User = {
      _id: this.user._id,
      ...formValue,
    };
    this.userService.update(updatedUser).subscribe(() => { 
      this.router.navigate(['app','users', this.user._id]);
    });
  }
}