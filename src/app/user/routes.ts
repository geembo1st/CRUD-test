import { Routes } from "@angular/router";
import { UserCreatePageComponent } from "./pages/user-create-page/user-create-page.component";
import { UserPageComponent } from "./pages/user-page/user-page.component";
import { UserUpdateComponent } from "./pages/user-update/user-update.component";
import { UsersListPageComponent } from "./pages/users-list-page/users-list-page.component";
import { getUserResolverFunc } from "./services/get-user.resolver";
import { AuthGuard } from "../auth.guard";


export const USER_ROUTES: Routes = [
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
        data: {
            title: "Пользователь",
        },
        children: [
            {
                path: '',
                component: UserPageComponent,   
                resolve: {
                    user: getUserResolverFunc
                },
            },
            {
                path: 'update',
                component: UserUpdateComponent,    
                resolve: {
                    user: getUserResolverFunc
                },
                data: {
                    title: "Изменение",
                },  
                canActivate: [AuthGuard]
            }
        ]
    }
]