import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [CommonModule, FormsModule, AuthRoutingModule, MaterialModule],
  declarations: [LoginComponent],
})
export class AuthModule {}
