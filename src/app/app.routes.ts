import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';



export const routes: Routes = [
    {
        path:'',
        redirectTo:'app',
        pathMatch:'full',
    },
    {
        path: 'app',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'users',
                pathMatch:'full',
            },
            {
                path:'users',
                data: {
                    title: "Пользователи",
                },
                loadChildren: () => import('./user/routes').then((c) => c.USER_ROUTES)
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    }
];

