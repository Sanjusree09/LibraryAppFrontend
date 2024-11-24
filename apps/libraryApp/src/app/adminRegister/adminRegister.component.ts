import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminRegister.component.html',
  styleUrl: './adminRegister.component.css',
})
export class AdminRegisterComponent {
  
  login(){
    this.router.navigate(['/admin']);
  }

  name: string = '';
  email: string = '';
  role: string = ''; 
  

  loginName: string = '';
  loginEmail: string = '';
  loginRole: string = '';


  isRegistering: boolean = false;
  isLoggingIn: boolean = false;


  registeredUser: { name: string, email: string, role: string } | null = null;

  constructor(private apiService: ApiService, private router: Router) {}


  onRegister() {
    if (this.isRegistering) return; 
    this.isRegistering = true; 

    const userData = {
      name: this.name,
      email: this.email,
      role: this.role
    };

    this.apiService.registerAdmin(userData)
      .then(response => {
        console.log('Registration successful:', response);
        this.registeredUser = userData; 
        
      })
      .catch(error => {
        console.error('Registration failed:', error);
      
      })
      .finally(() => {
        this.isRegistering = false; 
      });
      this.router.navigate(['/admin']);
  }
  onLogin() {
    if (this.isLoggingIn) return; 
    this.isLoggingIn = true;
    if (this.registeredUser) {
      if (this.loginName === this.registeredUser.name && 
          this.loginEmail === this.registeredUser.email && 
          this.loginRole === this.registeredUser.role) {
        
        console.log('Login successful: User validated');
    
      } else {
        console.error('Login failed: Invalid credentials');
     
      }
    } else {
      console.error('Login failed: No registered user data found');

    }

    this.isLoggingIn = false; 
  }

}