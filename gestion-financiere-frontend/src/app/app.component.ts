// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // S'abonner aux changements d'état de l'authentification
    this.authService.isAuthenticated().subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });

    // Vérifier immédiatement l'état de l'authentification
    this.isAuthenticated = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
