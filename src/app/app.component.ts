import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth/auth.service';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgbModule,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.authService.checkLogin();
    this.authService.fetchRoles();
  }
}
