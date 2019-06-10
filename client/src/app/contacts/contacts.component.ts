/* Contacts Component Type Script File */

import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service'; // for contact service having all the operations
import { Contact } from '../contact'; // for contact schema
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms'; // required for form validation

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
  angForm: FormGroup;
  submitted = false; // Turns true only when add contact button is clicked. Then the actual form validation starts

  // This is called dependency injection where here instance of ContactService class is created as contactService
  // Constructor FormBuilder to validate forms
  constructor(private contactService: ContactService, private fb: FormBuilder) {
  }

  // Add contact method in component file..this will communicate with 'contact.service.ts' file...that will communicate with 'route.js' file
  // In route.js it has methods to call mongodb database to add contact
  // FLOW: contacts.component.html -> contacts.component.ts -> contact.service.ts -> route.js(operation to execute on the MongoDb database).
  addContact() {
    // Once add contact gets called then set flag true and see if angular form is valid or not otherwise early return
    this.submitted = true;
        // stop here if form is invalid
    if (this.angForm.invalid) {
      return;
    }

    const newContact = {
      first_name: this.angForm.value.first_name,
      last_name: this.angForm.value.last_name,
      phone: this.angForm.value.phone
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
    this.angForm = this.fb.group({
      first_name: ['', Validators.required ],
      last_name: ['', Validators.required ],
      phone: ['', [Validators.required, Validators.minLength(10)] ]
    });
    this.contactService.getContacts()
        .subscribe( (contacts: Contact[]) => // Here we are typecasting contacts which is an object to 'Contact[]' array
            this.contacts = contacts); // since it will be returning observable we need to subscribe that
  }
}
