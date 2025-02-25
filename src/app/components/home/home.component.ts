import { Component, inject, OnInit } from '@angular/core';
import { NavcardComponent } from "../navcard/navcard.component";
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavcardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  isLoggedIn: boolean | null = null;

  ngOnInit() {
    this.authService.loggedInObservable.subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn === false) {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => console.error("Error in login check:", err)
    });
  }
}
