import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { JwtService } from './services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private jwtService: JwtService
  ) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    this.loginService.login(this.formLogin.value).subscribe(
      (data) => {
        this.jwtService.createToken(data.token);
        this.router.navigate(['admin', 'invoice']);
        console.log(data);
      },
      (error) => console.log(error)
    );
  }
}
