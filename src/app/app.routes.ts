import { Routes } from '@angular/router';
import { UsersListPageComponent } from './user/pages/users-list-page/users-list-page.component';
import { UserCreatePageComponent } from './user/pages/user-create-page/user-create-page.component';
import { UserPageComponent } from './user/pages/user-page/user-page.component';
import { UserUpdateComponent } from './user/pages/user-update/user-update.component';
import { getUserResolverFunc } from './user/services/get-user.resolver';



export const routes: Routes = [
    {
        path:'',
        redirectTo:'users',
        pathMatch:'full',
    },
    {
        path:'users',
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
            },
            {
                path: 'list',
                component: UsersListPageComponent,
            },
            {
                path: 'create',
                component: UserCreatePageComponent,
            },
            {
                path: ':userId',
                component: UserPageComponent,   
                resolve: {
                    user: getUserResolverFunc
                }         
            },
            {
                path: ':userId/update',
                component: UserUpdateComponent,     
            }
        ],
    },
];

