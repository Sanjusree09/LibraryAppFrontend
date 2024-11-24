import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-member',
  standalone: true,
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
  imports: [CommonModule, FormsModule],
})
export class MemberComponent {
  loginName: string = '';
  loginEmail: string = '';
  loginPassword: string = '';
  isLoggingIn: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  onLogin() {
    if (this.isLoggingIn) return; 
    this.isLoggingIn = true; 

    const loginData = {
      loginName: this.loginName,
      loginEmail: this.loginEmail,
      loginPassword: this.loginPassword,
    };

    this.apiService.loginMember(loginData)
      .then(response => {
        console.log(response); 
        this.router.navigate(['/memberPanel']); 
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
    this.router.navigate(['/memberRegister']); 
  }
}
