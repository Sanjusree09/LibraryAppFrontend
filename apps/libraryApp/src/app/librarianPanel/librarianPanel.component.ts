import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-librarian-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './librarianPanel.component.html',
  styleUrl: './librarianPanel.component.css',
})
export class LibrarianPanelComponent  {

  @Input() books: any[] = []; 
  @Input() patron: any[]=[];
  @Input() Registry:any[]=[];
  @Input() showBooks: boolean = false; 
  @Input() headers:string[]= ['S.no', 'Book ID', 'Title', 'Author', 'Quantity', 'Edition', 'Description'];
  @Input() membersHeaders: string[] = ['S.No', 'Member ID', 'Name', 'Email', 'Contact Number', 'Address', 'Occupation',];
  @Input() registryHeaders:string[] = ['S.No','Registry Id','Name','Title','Author','Quantity','Edition','Borrowed Date', 'Return Date']

//showBooks: Boolean = false;
showAddBooks:Boolean = false;
showUpdateBooks:Boolean = false;

showMembers: Boolean = false;
showAddMembers:Boolean = false;
showUpdateMembers:Boolean = false;

showRegistry: Boolean = false;
showAddRegistry:Boolean = false;
showUpdateRegistry:Boolean = false;

showSelectBook:Boolean = false;
showSelectRegister:Boolean = false;
showSelectMember:Boolean = false;


id:string='';
bookId:string = '';
title:string = '';
author:string='';
quantity:string = '';
edition:string='';
description:string='';
//generatedBookId:string='';
isAddBook:boolean = false;


registryId:string='';
borrowerName:string='';
registryTitle:string='';
registryAuthor:string='';
registryQuantity:string='';
registryEdition:string='';
registryBorrowedDate:string='';
registryReturnDate:string='';

memberId:string='';
memberName:string='';
memberEmail:string='';
memberContactNumber:string='';
memberAddress:string='';
memberOccupation:string='';


selectedMember:any = null;
showMemberDetails = false;

selectedBook: any = null;
showBookDetails = false;

selectedAdmin:any = null;
showAdminDetails = false;

selectedRegistry:any = null;
showRegistryDetails = false;



  constructor(private router: Router, private apiService: ApiService){}
 
  toggleBook(){
    this.showBooks = !this.showBooks;
    if(this.showBooks){
     this.showMembers=false;
     this.showAddMembers=false;
     this.showUpdateMembers=false;
     this.showAddBooks=false;
     this.showUpdateBooks=false;
     this.showRegistry=false;
     this.showAddRegistry=false;
     this.showUpdateRegistry=false;
    }
  
  }
selectAdmin(name: string){
    this.apiService.getAdminByName(name).then(response => {
      this.selectedAdmin = response;
      this.showAdminDetails = true;

    }).catch(error => {
      console.error(`Error fetching admin details:`,error);
    })
  }
 

  
  member(){
    //event.preventDefault();
    this.showMembers = !this.showMembers;
    if(this.showMembers){
     this.showAddMembers=false;
     this.showUpdateMembers=false;
     this.showAddBooks=false;
     this.showBooks=false;
     this.showUpdateBooks=false;
     this.showRegistry=false;
     this.showAddRegistry=false;
     this.showUpdateRegistry=false;
    }
    
   

  }
  updateMember(){
    this.showUpdateMembers = !this.showUpdateMembers;
    if(this.showUpdateMembers){
      this.showMembers = false;
      this.showAddMembers = false;
      this.showBooks = false;
      this.showAddBooks=false;
      this.showUpdateBooks=false;
      this.showRegistry = false;
      this.showAddRegistry=false;
     this.showUpdateRegistry=false;
      

    }
  }
  registry(){
    this.showRegistry = !this.showRegistry;
   if(this.showRegistry){
    this.showMembers=false;
    this.showAddMembers=false;
    this.showUpdateMembers=false;
    this.showBooks = false;
    this.showAddBooks=false;
    this.showUpdateBooks=false;
    this.showAddRegistry = false;
    this.showUpdateRegistry=false;
    
   }
  }
addBooks(){
  this.showAddBooks = !this.showAddBooks;
  if(this.showAddBooks){
    this.showMembers = false;
    this.showAddMembers = false;
    this.showUpdateMembers=false;
    this.showBooks = false;
    this.showUpdateBooks=false;
    this.showMembers = false;
    this.showRegistry = false;
    this.showAddRegistry=false;
    this.showUpdateRegistry=false;
   
  }


}
updateBooks(){
  this.showUpdateBooks = !this.showUpdateBooks;
  if(this.showUpdateBooks){
    this.showMembers = false;
    this.showAddMembers = false;
    this.showUpdateMembers=false;
    this.showBooks = false;
    this.showAddBooks = false;
    this.showRegistry = false;
    this.showAddRegistry=false;
    this.showUpdateRegistry = false;
   
   
  }
  

}
addMembers(){
  this.showAddMembers = !this.showAddMembers;
  if(this.showAddMembers){
    this.showMembers = false;
    this.showUpdateMembers=false;
    this.showBooks = false;
    this.showAddBooks=false;
    this.showUpdateBooks=false;
    this.showRegistry = false;
    this.showAddRegistry=false;
    this.showAddBooks = false;
    this.showUpdateRegistry=false;
    
  }
}

closeBookDetails() {
  this.selectedBook = null;
  this.showBooks = true;  
}
closeRegistryDetails(){
  this.showRegistryDetails = false;
  this.selectedRegistry = null;
}
addRegistry(){
  this.showAddRegistry = !this.showAddRegistry;
 if(this.showAddRegistry){
  this.showMembers=false;
  this.showAddMembers=false;
  this.showUpdateMembers=false;
  this.showBooks=false;
  this.showAddBooks=false;
  this.showUpdateBooks=false;
  this.showRegistry=false;
  this.showUpdateRegistry=false;
 }
}
updateRegistry(){
  this.showUpdateRegistry = !this.showUpdateRegistry;
  if(this.showUpdateRegistry){
    this.showMembers=false;
    this.showAddMembers=false;
    this.showUpdateMembers=false;
    this.showBooks=false;
    this.showAddBooks=false;
    this.showUpdateBooks=false;
    this.showRegistry=false;
    this.showAddRegistry=false;

  }
}


addBook(event:Event) {
  event.preventDefault(); 

  if (!this.title || !this.author || !this.quantity || !this.edition ||!this.description) {
    alert("Please fill all the fields.");
    return;
  }

  const bookData = {
    id : this.id,
    title : this.title,
    author:this.author,
    quantity:this.quantity,
    edition : this.edition,
    description: this.description
  };
  this.apiService.addBooks(bookData)
    .then(response => {
      console.log('Book Added Successfully:', response);
      const bookId = response.book;

      this.books.push({
        bookId: bookId.id,
        title: this.title,
        author: this.author,
        quantity: this.quantity,
        edition: this.edition,
        description: this.description
      });
      console.log('Book ID:',this.id);

      this.title = '';
      this.author = '';
      this.quantity = '';
      this.edition = '';
      this.description = '';
    })
    .catch(error => {
      console.error('Error adding book:', error);
      alert('Error to addBooks');
    });
}
selectBook(bookId: string) {
  this.apiService.getBookById(bookId).then(book => {
    this.selectedBook = book;
    this.showBooks = false;  
    this.showUpdateBooks = true;  
  }).catch(error => {
    console.error('Error fetching book:', error);
  });
}

onUpdateBook() {
  const updatedData = {
    title: this.title,
    author: this.author,
    quantity: this.quantity,
    edition: this.edition,
    description: this.description
  };

  this.apiService.updateBook(this.bookId, updatedData)
    .then(response => {
      console.log('Book updated:', response);
      this.books = this.books.map(book =>
        book.bookId === this.bookId ? { ...book, ...updatedData } : book
      );

      this.showBooks = true;  
      this.showUpdateBooks = false;  
    })
    .catch(error => {
      console.error('Error updating book:', error);
      alert('Error updating book');
    });
}




addregistry(event: Event) {
  event.preventDefault();

  const registryData = {
    borrowerName: this.borrowerName,
    registryTitle: this.registryTitle,
    registryAuthor: this.registryAuthor,
    registryQuantity: this.registryQuantity,
    registryEdition: this.registryEdition,
    registryBorrowedDate: this.registryBorrowedDate,
    registryReturnDate: this.registryReturnDate
  };

  this.apiService.addRegistry(registryData)
    .then(response => {
      console.log('Response from backend:', response);
      console.log('Received registryId:', response.registryId);  

      this.Registry.push({
        id: response.registryId,
        borrowerName: this.borrowerName,
        registryTitle: this.registryTitle,
        registryAuthor: this.registryAuthor,
        registryQuantity: this.registryQuantity,
        registryEdition: this.registryEdition,
        registryBorrowedDate: this.registryBorrowedDate,
        registryReturnDate: this.registryReturnDate
      });

      console.log('Updated Registry Array:', this.Registry); 

      this.borrowerName = '';
      this.registryTitle = '';
      this.registryAuthor = '';
      this.registryQuantity = '';
      this.registryEdition = '';
      this.registryBorrowedDate = '';
      this.registryReturnDate = '';
    })
    .catch(error => {
      console.error('Error adding Registry book:', error);
      alert('Error adding book');
    });
}
selectRegistry(registryId: string) {
  this.apiService.getRegistryById(registryId).then(registry => {
    this.selectedRegistry = registry;
    this.showRegistry = false;  
    this.showUpdateRegistry = true;  
  }).catch(error => {
    console.error('Error fetching Registry:', error);
  });
}
onUpdateRegistry() {
  const updatedRegistry = {
    borrowerName:this.borrowerName,
    registryTitle: this.registryTitle,
    registryAuthor: this.registryAuthor,
    registryQuantity: this.registryQuantity,
    registryEdition: this.registryEdition,
    registryBorrowedDate: this.registryBorrowedDate,
    registryReturnDate: this.registryReturnDate
  };

  this.apiService.updateRegistry(this.registryId, updatedRegistry)
    .then(response => {
      console.log('Book updated:', response);
      this.Registry = this.Registry.map(registry =>
        registry.registryId === this.registryId ? { ...registry, ...updatedRegistry } : registry
      );

      this.showBooks = true;  
      this.showUpdateBooks = false;  
    })
    .catch(error => {
      console.error('Error updating book:', error);
      alert('Error updating book');
    });
}




addMember(event: Event) {
  event.preventDefault(); 

  const memberData = {
    memberId: this.memberId,  
    memberName: this.memberName,
    memberEmail: this.memberEmail,
    memberContactNumber: this.memberContactNumber,
    memberAddress: this.memberAddress,
    memberOccupation: this.memberOccupation,
  };

  this.apiService.addMember(memberData)
    .then(response => {
      console.log('Member Added Successfully:', response);
      const memberId = response.memberId;
      console.log('Member ID:', memberId);
  
      this.patron.push({
        memberId: memberId,  
        memberName: this.memberName,
        memberEmail: this.memberEmail,
        memberContactNumber: this.memberContactNumber,
        memberAddress: this.memberAddress,
        memberOccupation: this.memberOccupation,
      });

      this.memberName = '';
      this.memberEmail = '';
      this.memberContactNumber = '';
      this.memberAddress = '';
      this.memberOccupation = '';
    })
    .catch(error => {
      console.error('Error adding member:', error);
      alert('Error adding member');
    });
}
selectMember(memberId: string) {
  this.apiService.getMembersById(memberId).then(member => {
    this.selectedMember = member;
    this.showMembers = false;  
    this.showUpdateMembers = true;  
  }).catch(error => {
    console.error('Error fetching Member:', error);
  });
}
onUpdateMembers() {
  const updatedMember = {
    memberName: this.memberName,
    memberEmail: this.memberEmail,
    memberContactNumber: this.memberContactNumber,
    memberAddress: this.memberAddress,
    memberOccupation: this.memberOccupation
  };

  this.apiService.updateMember(this.memberId, updatedMember)
    .then(response => {
      console.log('Member updated:', response);
      this.patron = this.patron.map(member =>
        member.memberId === this.memberId ? { ...member, ...updatedMember } : member
      );

      this.showBooks = true;  
      this.showUpdateBooks = false;  
    })
    .catch(error => {
      console.error('Error updating book:', error);
      alert('Error updating book');
    });
}





}



