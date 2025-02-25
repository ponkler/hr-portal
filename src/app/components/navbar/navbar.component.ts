import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgbCollapseModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @ViewChild('navToggler') toggler!: ElementRef
  
  authService = inject(AuthService)
  router = inject(Router)
  isLoggedIn: boolean | null = null;
  roles: string[] = [];
  isMenuCollapsed = true;
  isTogglerVisible = false;
  
  ngOnInit() {
    this.checkTogglerVisibility();
    this.authService.loggedInObservable.subscribe((result) => {
      this.isLoggedIn = result;
    })
    this.authService.rolesObservable.subscribe((roles) => {
      this.roles = roles;
    })
  }

  tryLogout() {
    this.authService.logout().subscribe(response => {
      this.router.navigate(['/login']);
    });
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkTogglerVisibility();
  }

  checkTogglerVisibility() {
    if (this.toggler) {
      this.isTogglerVisible = getComputedStyle(this.toggler.nativeElement)
        .display !== 'none';
    }
  }
}
