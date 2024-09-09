import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable } from "rxjs";
import { User } from "../../user/models/user";
import { UserService } from "../../user/services/user.service";

const CURRENT_USER_LOCAL_STORAGE_KEY = 'CURRENT_USER';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public currentUser$ = new BehaviorSubject<User | null>(null);

    private constructor(
        private userService: UserService,
    ) {
        const userId = localStorage.getItem(CURRENT_USER_LOCAL_STORAGE_KEY);
        if (!userId) {
            return;
        }
        this.userService.get(userId).pipe(
            catchError((err) => {
                localStorage.removeItem(CURRENT_USER_LOCAL_STORAGE_KEY);
                throw err;
            }),
        ).subscribe((current) => {
            this.currentUser$.next(current);
        })
    }

    public auth(login: string, password: string): Observable<User | null> {
        return this.userService.getAll().pipe(
            map((users) => {
                const current = users.find((user) => user.login === login && user.password === password);
                if (current) {
                    this.currentUser$.next(current);
                    localStorage.setItem(CURRENT_USER_LOCAL_STORAGE_KEY, current._id);
                    return current;
                }
                return null;
            })
        );
    }

    public logout() {
        localStorage.removeItem(CURRENT_USER_LOCAL_STORAGE_KEY);
        this.currentUser$.next(null);
    }
}