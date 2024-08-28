import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './user/services/user.service';
import { User } from './user/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnInit, OnDestroy {
  user!: User;
  private routeSub!: Subscription;

  constructor(private userService: UserService,private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      if (userId) {
        this.userService.get(userId).subscribe(
          (user) => {
            this.user = user;
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    return false;


    // if(this.user.userRoles.includes('Admin')) {
    //   return true;
    // }
    // else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }

  }
}
