import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription, mergeMap } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  user: User | null = null;

  constructor(private userService:UserService, private route:ActivatedRoute, private router: Router){
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.pipe(
      mergeMap(({ userId }) => this.userService.get(userId)),
    ).subscribe((user) => {
      this.user=user;
      console.log(this.user)
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
  
  updateUser(){
    if (this.user) {
      this.userService.update(this.user).subscribe(() => { 
        this.router.navigate(['users', 'list']);
      });
    } else {
      console.error('Пользователь не найден для обновления');
  }
}

}
