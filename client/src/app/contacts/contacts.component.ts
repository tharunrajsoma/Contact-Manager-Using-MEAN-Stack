/* Contacts Component Type Script File */

import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service'; // for contact service having all the operations
import { Contact } from '../contact'; // for contact schema

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService] // We need to use to provide 'providers' inorder to use the service
})
export class ContactsComponent implements OnInit {
  contacts: Contact[]; // creating contacts of type 'Contact'
  contact: Contact;
  first_name: string;
  last_name: string;
  phone: string;

  // This is called dependency injection where here instance of ContactService class is created as contactService
  constructor(private contactService: ContactService) { }

  // Add contact method in component file..this will communicate with 'contact.service.ts' file...that will communicate with 'route.js' file
  // In route.js it has methods to call mongodb database to add contact
  // FLOW: contacts.component.html -> contacts.component.ts -> contact.service.ts -> route.js(operation to execute on the MongoDb database).
  addContact() {
    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    };
    // Now we need to provide this contact that is created to contact.service
    this.contactService.addContact(newContact)
        .subscribe( (contact: Contact) => { // Here we are typecasting contact which is an object to type 'Contact'
          this.contacts.push(contact); // Pushing the new contact to our client side contacts array
          this.contactService.getContacts()
              .subscribe( (contacts: Contact[]) => // Here we are typecasting contacts which is an object to 'Contact[]' array
              this.contacts = contacts); // since it will be returning observable we need to subscribe that
        });
  }

  // Delete method
  deleteContact(id: any) {
    const contacts = this.contacts;
    // Here we call our service again
    this.contactService.deleteContact(id)
        .subscribe(suc => { // since it will be returning observable we need to subscribe that
          // If delete operation is successful then we need to remove that contact even from our client side contacts array also
          // if (data.n === 1) { // data.n cannot be used. It throws error
            for (let i = 0; i < contacts.length; i++) {
              if (contacts[i]._id == id) { // If that contact id exists in our client side populated table then delete it
                contacts.splice(i, 1);
              }
            }
         // }
        });
  }

  // retrieving the data logic. This will be initiated once our component is loaded into the browser.
  // Whenever we load our component this gets called automatically.
  ngOnInit() {
    this.contactService.getContacts()
        .subscribe( (contacts: Contact[]) => // Here we are typecasting contacts which is an object to 'Contact[]' array
            this.contacts = contacts); // since it will be returning observable we need to subscribe that
  }
}
