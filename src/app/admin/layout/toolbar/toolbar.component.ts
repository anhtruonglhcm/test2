import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtService } from 'src/app/login/services/jwt.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  constructor(private jwtService: JwtService, private router: Router, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void { }
  logout() {
    this.jwtService.destroyToken();
    this.router.navigate(['/login']);
    this.matSnackBar.open('Success', 'Logout', { duration: 1000 })
  }
}
