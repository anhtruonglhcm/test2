import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { JwtService } from './jwt.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GuardLoginGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private jwtService: JwtService, private http: HttpClient) { }
  canActivate(): boolean {
    if (this.jwtService.getToken()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  canActivateChild() {
    return this.canActivate();
  }
}
