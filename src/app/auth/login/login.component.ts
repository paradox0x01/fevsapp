import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public error = '';
  
  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  login() {
    this.authService.logIn(this.loginForm.value)
        .subscribe(data => {
          this.authService.setToken(data.token);
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.error = error.error;
        }
        );
  }

}
