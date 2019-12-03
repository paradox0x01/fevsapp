import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FEVSAPP';
  constructor(private router: Router, public authService: AuthService) {}

  logOut() {
    this.authService.doLogOut();
  }
}
