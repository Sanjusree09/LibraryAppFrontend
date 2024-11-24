import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';



@Component({
  selector: 'app-member-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
 templateUrl: './memberRegister.component.html',
  styleUrls: ['./memberRegister.component.css'],
 
})
export class MemberRegisterComponent {
  
  onLogin(){
    this.router.navigate(['/member']);
  }

  name: string ='';
  email:string='';
  //password:string='';
  contactNumber:string='';
  address:string='';
  occupation:string='';
  //members: string[] = [];
  showMembers = true;

  loginName: string='';
  loginEmail:string='';
  loginPassword:string='';
  loginContactNumber:string='';
  loginAddress:string='';
  loginOccupation:string='';

  isRegistering:boolean = false;
  isLoggingIn: boolean = false;

  registeredMember:{memberName:string, memberEmail:string,memberContactNumber:string, memberAddress:string, memberOccupation:string} |null = null;
  memberData:{name:string, email:string,contactNumber:string, address:string,occupation:string}[]=[];
  constructor(private apiService:ApiService, private router:Router){}

register(){
  if(this.isRegistering) return;
  this.isRegistering = true;

  const memberData = {
    memberName: this.name,
    memberEmail: this.email,
    //password: this.password,
    memberContactNumber:this.contactNumber,
    memberAddress:this.address,
    memberOccupation:this.occupation
  };

  this.apiService.registerMember(memberData)
  .then(response => {
    console.log(`Registration Successful:`,response);
    this.registeredMember = memberData;
    this.name='';
    this.email='';
    //this.password='';
    this.contactNumber='';
    this.address='';
    this.occupation='';

    this.memberData.push({
      ...memberData,
      name: '',
      email: '',
      contactNumber: '',
      address: '',
      occupation: ''
    });

  })
  .catch(error => {
    console.error(`Registration Failed:`,error);
  })
  .finally(() => {
    this.isRegistering = false;
  });
  this.router.navigate(['/member']);

  

}

login(){
  if(this.isLoggingIn) return;
  this.isLoggingIn =  true;

  if(this.registeredMember){
    if(this.loginName === this.registeredMember?.memberName && this.loginEmail === this.registeredMember.memberEmail){
  
        console.log(`Login Successful: User Validated`);
      } else {
        console.error(`Login Failed: Invalid credentials`);
      }

  } else {
    console.error(`Login Failed: No registered member data found`);
  }
  this.isLoggingIn = false;

 
  
}



}
