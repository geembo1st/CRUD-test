import { ResolveFn } from "@angular/router";
import { UserService } from "./user.service";
import { inject } from "@angular/core";
import { User } from "../models/user";

export const getUserResolverFunc: ResolveFn<User> = (route, state) => {
    const userId = route.paramMap.get('userId')!;
    return inject(UserService).get(userId);
};
