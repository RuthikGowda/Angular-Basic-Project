import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Service/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  private userSub!: Subscription;
  authSrv = inject(AuthService);
  router = inject(Router);

  isLoggedIn$ = this.authSrv.loggedIn$;

  ngOnInit(): void {
    //  this.userSub = this.authSrv.loggedIn$.subscribe(
    //   status=> this.isLoggedIn = status
    //  )
    if (sessionStorage.getItem('user') !== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  LogOut(){
    this.authSrv.setLoggedIn(false);
    sessionStorage.removeItem('user');
    this.isLoggedIn = false;
    console.log('User logged out successfully.');
    this.router.navigate(['/Login']);
  }
}
