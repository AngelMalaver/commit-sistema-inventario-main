import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router class
import { AuthService } from '../../services/auth.service'; // Import the AuthService class

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  login(username: string, password: string): void {
    if (this.authService.login(username, password)) {
      this.router.navigate(['/productos']);
    } else {
      alert('Login failed');
    }
  }

  
}
