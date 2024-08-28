import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AddUserData } from '../models/add-user-data';


@Injectable({
  providedIn: 'root',
})
export class UserService {
    
  baseHref = 'https://crudcrud.com/api/4a7bc6db81f94fd28b18ebe64dd5159a';
    static getUserById: any;
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseHref}/users`);
  }

  get(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseHref}/users/${id}`)
  }

  create(user: AddUserData): Observable<User> {
    return this.http.post<User>(`${this.baseHref}/users`, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseHref}/users/${user._id}`, {
      ...user,
      _id: undefined,
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseHref}/users/${id}`);
  }
}

