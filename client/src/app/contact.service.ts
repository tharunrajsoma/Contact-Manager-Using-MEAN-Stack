/*
 * Service to seperate business logic into another file
 * We inject these services into our component so as to use the service
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Contact } from './contact'; // for using the schema
// import { map } from 'rxjs/operators'; // reactive js map operator.
// The above map operator is no longer. Because Http got updated to HttpClient
// with this change HttpClient by default formats the response to JSON.

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // using http module
  constructor(private http: HttpClient) { }

  // retrieving contacts service
  getContacts() {
    return this.http.get('http://localhost:3000/api/contacts');
    // .pipe(map((res: Response) => res)); // This is not needed, new HttpClient by default formats the response to JSON.
  }

  // add contact method call to this method comes from contact.component.ts file
  // This method will inturn call addContact method in route.js file
  // route.js has functionality to directly communicate with Mongodb database inorder to add contact
  // FLOW: contacts.component.html -> contacts.component.ts -> contact.service.ts -> route.js(operation to execute on the MongoDb database).
  addContact(newContact) {
    if (!newContact.first_name) {
      newContact.first_name = 'undefined';
    }
    if (!newContact.last_name) {
      newContact.last_name = 'undefined';
    }
    if (!newContact.phone) {
      newContact.phone= 'undefined';
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json'); // for setting format
    return this.http.post('http://localhost:3000/api/contact', newContact, { headers: headers });
  }

  // delete method
  deleteContact(id) {
    return this.http.delete('http://localhost:3000/api/contact/' + id);
  }
}
