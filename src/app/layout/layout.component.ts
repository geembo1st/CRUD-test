import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadCrumbsComponent } from "../bread-crumbs/bread-crumbs.component";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, BreadCrumbsComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
