import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../shared/material/material.module';
import { LoginService } from './services/login.service';
import { JwtService } from './services/jwt.service';
import { ReactiveFormsModule } from '@angular/forms';
import { GuardLoginGuard } from './services/guard-login.guard';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  providers: [LoginService, JwtService, GuardLoginGuard],
})
export class LoginModule {}
