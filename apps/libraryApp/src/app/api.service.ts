import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private apiUrl = 'http://localhost:3600'; 
  constructor() { }

  
  registerAdmin(userData: { name: string; email: string; role: string; }) {
    console.log(`UserData:`,userData);
    return axios.post(`${this.apiUrl}/admin/Signup`, userData)
      .then(response => response.data)
      .catch(error => {
        throw error; 
      });
  }

  getAdminByName(id: string) {
    return axios.get(`${this.apiUrl}/admin/getAdmin/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching book:', error);
        throw error; 
      });
  }
  
  loginAdmin(credentials: {loginEmail: string }) {
    console.log(`LoginData:`,credentials);
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
    
    if(registeredUser.email === credentials.loginEmail){
      console.log(`login Successful: User Validated`);
      return Promise.resolve({message:`Login Successful`});
    } else  {
      console.error('Login failed: Invalid credentials');
      return Promise.reject(new Error('Invalid credentials'));
    }
  
    // return axios.post(`${this.apiUrl}/admin/Login`, credentials)
    //   .then(response => response.data)
    //   .catch(error => {
    //     throw error; // Propagate the error to be handled in the component
    //   });
  }


   ////////////Member Registration and login//////////////
  registerMember(memberData: { memberName: string; memberEmail: string; memberContactNumber: string; memberAddress:string; memberOccupation:string }) {
    console.log(`UserData:`,memberData);
    localStorage.setItem('registeredMember',JSON.stringify(memberData));
    return axios.post(`${this.apiUrl}/member/Signup`, memberData)
      .then(response => response.data)
      .catch(error => {
        throw error; 
      });
  }


  loginMember(credentials: {loginName:string, loginEmail: string, loginPassword: string }) {
    console.log(`LoginData:`,credentials);
    const registeredMember = JSON.parse(localStorage.getItem('registeredMember') || '{}');
    
    if(registeredMember.name === credentials.loginName && registeredMember.email === credentials.loginEmail && registeredMember.password === credentials.loginPassword){
      console.log(`login Successful: User Validated`);
      return Promise.resolve({message:`Login Successful`});
    } else  {
      console.error('Login failed: Invalid credentials');
      return Promise.reject(new Error('Invalid credentials'));
    }
  
    
  }


  //////////////////////////Add books///////////////////////////////////////////////

  addBooks(bookData: {title:string, author:string, quantity:string , edition:string, description:string}){
    return axios.post(`${this.apiUrl}/addBooks`,bookData)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });

  }
  getBookById(id: string) {
    return axios.get(`${this.apiUrl}/getBooks/${id}`)
      .then(response => response.data.book)  
      .catch(error => {
        console.error('Error fetching book:', error);
        throw error;
      });
  }
  updateBook(bookId: string, updatedData: { title: string; author: string; quantity: string; edition: string; description: string }) {
    console.log(`Updating Book ID: ${bookId} with Data:`, updatedData);
    return axios.put(`${this.apiUrl}/updateBooks/${bookId}`, updatedData)
      .then(response => {
        console.log('Book updated successfully:', response.data);
        return response.data;  
      })
      .catch(error => {
        console.error('Error updating book:', error);
        throw error; 
      });
  }

  //////////////////MEMBER/////////////////////////////
  addMember(memberData:{memberName:string; memberEmail:string; memberContactNumber:string; memberAddress:string; memberOccupation:string})
  {
    return axios.post(`${this.apiUrl}/member/Signup`,memberData)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
  }
  getMembersById(id: string) {
    return axios.get(`${this.apiUrl}/getMember/${id}`)
      .then(response => response.data.member)
      .catch(error => {
        console.error('Error fetching member:', error);
        throw error; 
      });
  }

  updateMember(memberId: string, updatedMember: { memberName: string; memberEmail: string; memberContactNumber: string; memberAddress: string; memberOccupation: string }) {
    console.log(`Updating Member ID: ${memberId} with Data:`, updatedMember);
    return axios.put(`${this.apiUrl}/updateMember/${memberId}`, updatedMember)
      .then(response => {
        console.log('Member updated successfully:', response.data);
        return response.data;  
      })
      .catch(error => {
        console.error('Error updating Member:', error);
        throw error; 
      });
  }



////////////////////REGISTRY/////////////////////////////


  addRegistry(registryData: {borrowerName:string, registryTitle:string, registryAuthor:string , registryQuantity:string, registryEdition:string, registryBorrowedDate:string, registryReturnDate:string}){
    console.log(`Registry Data:`,registryData);
    return axios.post(`${this.apiUrl}/addRegistry`,registryData)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });

  }
 

  getRegistryById(id: string) {
    return axios.get(`${this.apiUrl}/getRegistry/${id}`)
      .then(response => response.data.registry)
      .catch(error => {
        console.error('Error fetching registry:', error);
        throw error; 
      });
  }
  updateRegistry(registerId: string, updatedRegistry: {registryTitle: string; registryAuthor: string; registryQuantity: string; registryEdition: string; registryBorrowedDate:string; registryReturnDate:string }) {
    console.log(`Updating Registry ID: ${registerId} with Data:`, updatedRegistry);
    return axios.put(`${this.apiUrl}/updateRegistry/${registerId}`, updatedRegistry)
      .then(response => {
        console.log('Registry updated successfully:', response.data);
        return response.data;  
      })
      .catch(error => {
        console.error('Error updating Registry:', error);
        throw error; 
      });
  }
 
  
  
}
