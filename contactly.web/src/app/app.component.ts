import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  http = inject(HttpClient);
  contactForm = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string | null>(null),
    phone: new FormControl<string>(''),
    favorite: new FormControl<boolean>(false)

  })
  onFormSubmit() {
    const addContactRequest = {
      name: this.contactForm.value.name,
      phone: this.contactForm.value.email,
      email: this.contactForm.value.phone,
      favorite: this.contactForm.value.favorite,
    }
    this.http.post<Contact[]>('https://localhost:7111/api/Contacts', addContactRequest)
    .subscribe({next: (value)=>{
      console.log(value);
      this.contacts$ = this.getContacts();
      this.contactForm.reset();
    }})
  }
  onDelete(id: string){
    this.http.delete<Contact[]>(`https://localhost:7111/api/Contacts/${id}`)
    .subscribe({
      next: (value) =>{
        this.contacts$ = this.getContacts();
        alert("contact Deleted")
      }
    })

  }
  contacts$ = this.getContacts();
  private getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('https://localhost:7111/api/Contacts')
  }
}
