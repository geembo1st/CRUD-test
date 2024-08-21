import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { BreadCrumb } from '../../shared/breadCrumb';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService  {
    private breadCrumbs$ = new BehaviorSubject<BreadCrumb[]>([]);

    constructor(private router: Router) {
      this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root;
        const breadCrumbs = this.getBreadcrumbs(root);
        this.breadCrumbs$.next(breadCrumbs);
      })
    }

    getBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '/app', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
      const children: ActivatedRouteSnapshot[] = route.children;
  
      if (children.length === 0) {
        return breadcrumbs;
      }
  
      for (const child of children) {
        if (child.routeConfig?.data?.['title']) {
          const routeURL: string = child.url.map(segment => segment.path).join('/');
          if (routeURL) {
            url += `/${routeURL}`;
          }
  
          const breadcrumb: BreadCrumb = {
            label: child.routeConfig.data['title'],
            url: url
          };
          breadcrumbs.push(breadcrumb);
        }
          return this.getBreadcrumbs(child, url, breadcrumbs);
      }
    return breadcrumbs;
    }

    get breadCrumbs() {
      return this.breadCrumbs$.asObservable();
    }
}

