import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadCrumbsComponent } from "../bread-crumbs/bread-crumbs.component";
import { AuthService } from '../core/service/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, BreadCrumbsComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  public constructor(
    public authService: AuthService,
  ) {}

  public logout(): void {
    this.authService.logout();
  }
}
