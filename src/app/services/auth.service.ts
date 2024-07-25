import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import users from '../../data/users.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private loggedIn = new BehaviorSubject<boolean>(false);

  login(username: string, password: string): boolean {

    const user = users.find(u => u.username === username && u.password === password);
    if(user){
      this.loggedIn.next(true);
      return true;
    }

    return false;

  }

  logout(): void {
    this.loggedIn.next(false);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

}
