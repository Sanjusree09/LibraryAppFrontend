import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin',
  standalone: true,  
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, FormsModule],  
})
export class AdminComponent {
  loginName: string = '';
  loginEmail: string = '';
  loginRole: string = '';
  isLoggingIn: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  onLogin() {
    if (this.isLoggingIn) return; 
    this.isLoggingIn = true; 

    const loginData = {
      loginName: this.loginName,
      loginEmail: this.loginEmail,
      loginRole: this.loginRole,
    };

    this.apiService.loginAdmin(loginData)
      .then(response => {
        console.log(response); 
        this.router.navigate(['/librarianPanel']); 
      })
      .catch(error => {
        console.error(error.message); 
        alert('Login failed: Invalid credentials');
      })
      .finally(() => {
        this.isLoggingIn = false; 
      });
  }

  onRegister() {
    this.router.navigate(['/adminRegister']); 
  }
}
