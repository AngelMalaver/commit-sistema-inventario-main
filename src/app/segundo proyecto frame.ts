import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router class
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mostrarSearchForm = false;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  toggleSearchForm(): void {
    this.mostrarSearchForm = !this.mostrarSearchForm;
  }

  logout() {
    this.authService.logout();
    console.log('te llevare')
    this.router.navigate(['/Inicio']);
    console.log('te lleve al inicio')
  }

  title = 'Inventario';
}