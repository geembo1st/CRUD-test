import { Routes } from '@angular/router';
import { UsersListPageComponent } from './user/pages/users-list-page/users-list-page.component';
import { UserCreatePageComponent } from './user/pages/user-create-page/user-create-page.component';
import { UserPageComponent } from './user/pages/user-page/user-page.component';
import { UserUpdateComponent } from './user/pages/user-update/user-update.component';
import { getUserResolverFunc } from './user/services/get-user.resolver';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { USER_ROUTES } from './user/routes';



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

