import { Component, OnInit } from '@angular/core';
import { BreadCrumbService } from '../user/services/breadCrump.service';
import { BreadCrumb } from '../shared/breadCrumb';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bread-crumbs',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './bread-crumbs.component.html',
  styleUrl: './bread-crumbs.component.css'
})
export class BreadCrumbsComponent implements OnInit {
  breadCrumbs: BreadCrumb[] = [];

  constructor(private breadCrumbService: BreadCrumbService) {}

  ngOnInit(): void {
    this.breadCrumbService.breadCrumbs.subscribe((breadCrumbs: any[]) => {
      this.breadCrumbs = breadCrumbs;
    });
  }
}
