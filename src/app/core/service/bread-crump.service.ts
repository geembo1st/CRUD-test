import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { BreadCrumb } from '../../shared/breadCrumb';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService  {
    private breadCrumbs$ = new BehaviorSubject<BreadCrumb[]>([]);

    constructor(private router: Router, private route: ActivatedRoute) {
      this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const snapshot = this.router.routerState.snapshot.root;
        const breadCrumbs = this.getBreadcrumbs(snapshot);
        this.breadCrumbs$.next(breadCrumbs);
      })
    }

    getBreadcrumbs(route: ActivatedRouteSnapshot): BreadCrumb[] {
      const breadCrumbs: BreadCrumb[] = [];
      let children = [route]; 

      let url = '';
      while (children.length) {
        let child = children.pop();
        if (!child) {
          continue;
        }
        children.push(...child.children)

        const routeURL: string = child.url.map(segment => segment.path).join('/');
        url += `/${routeURL}`;
        if (child.routeConfig?.data?.['title']) {  
          const breadcrumb: BreadCrumb = {
            label: child.routeConfig.data['title'],
            url: url
          };
          breadCrumbs.push(breadcrumb);
        }
      }
      return breadCrumbs;
    }

    get breadCrumbs() {
      return this.breadCrumbs$.asObservable();
    }
}

