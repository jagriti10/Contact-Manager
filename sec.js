// Contact Class: Represents a Contact
class Contact {
	constructor(name,phoneno) {
	  this.name = name;
	  this.phoneno = phoneno;
	}
  }
  
  // UI Class: Handle UI Tasks
  class UI {
	static displayContacts() {
	  const contacts = Store.getContacts();
  	contacts.forEach((contact) => UI.addContactToList(contact));
	}
  
	static addContactToList(contact) {
	  const list = document.querySelector('#contact-list');
  
	  const row = document.createElement('tr');
  
	  row.innerHTML = `
		<td>${contact.name}</td>
		<td>${contact.phoneno}</td>
		<td><a href="#" class="ui red button delete">X</a></td>
	  `;
  
	  list.appendChild(row);
	}
  
	static deleteContact(el) {
	  if(el.classList.contains('delete')) {
		el.parentElement.parentElement.remove();
	  }
	}
  
	static showAlert(message, className) {
	  const div = document.createElement('div');
	  div.className = `ui ${className} message`;
	  div.appendChild(document.createTextNode(message));
	  const container = document.querySelector('.container');
	  const form = document.querySelector('#contact-form');
	  container.insertBefore(div, form);
  
	  // Vanish in 3 seconds
	  setTimeout(() => document.querySelector('.message').remove(), 3000);
	}
  
	static clearFields() {
	  document.querySelector('#name').value = '';
		document.querySelector('#phoneno').value = '';
}
	}
	class Store {
		static getContacts() {
			let contacts;
			if(localStorage.getItem('contacts') === null) {
				contacts =[];
			} else {
				contacts = JSON.parse(localStorage.getItem('contacts'));
			}
	
			return contacts;
		}
	
		static addContact(contact) {
			const contacts = Store.getContacts();
			contacts.push(contact);
			localStorage.setItem('contacts', JSON.stringify(contacts));
		}
		static removeContact(phoneno) {
			const contacts = Store.getContacts();
	
			contacts.forEach((contact, index) => {
				if(contact.phoneno === phoneno) {
					contacts.splice(index, 1);
				}
			});
	
			localStorage.setItem('contacts', JSON.stringify(contacts));
		}
	}
	// Event: Display Books
	document.addEventListener('DOMContentLoaded', UI.displayContacts);
	
	// Event: Add a Book
	document.querySelector('#contact-form').addEventListener('submit', (e) => {
		// Prevent actual submit
		e.preventDefault();
	
		// Get form values
		const name = document.querySelector('#name').value;
		const phoneno = document.querySelector('#phoneno').value;
	
		// Validate
		if(name === '' ||phoneno === '') {
			UI.showAlert('Please fill in all fields', 'red');
		} 
		else {
			// Instatiate book
			const contact = new Contact(name, phoneno);
	
			// Add Book to UI
			UI.addContactToList(contact);
	
			// Add book to store
			Store.addContact(contact);
	
			// Show success message
			UI.showAlert('Contact Added', 'green');
	
			// Clear fields
			UI.clearFields();
		}
	});
	// Event: Display Contacts
  document.addEventListener('DOMContentLoaded', UI.displayContacts);
  
  // Event: Add a Contact
  document.querySelector('#contact-form').addEventListener('submit', (e) => {
	// Prevent actual submit
	e.preventDefault();
  
	// Get form values
	const name = document.querySelector('#name').value;
	const phoneno = document.querySelector('#phoneno').value;
  
	// Validate
	if(name ==='' || phoneno === '') {
		UI.showAlert('Please fill in all fields', 'red');
	} else {
	  // Instatiate Contact
	  const contact = new Contact(name,phoneno);
  
	  // Add Contact to UI
	  UI.addContactToList(contact);
  
	  // Add Contact to store
	  Store.addContact(contact);
  
	  // Show success message
	  UI.showAlert('Contact Added','green');
  
	  // Clear fields
	  UI.clearFields();
	}
  });
  
  // Event: Remove a Contact
  document.querySelector('#contact-list').addEventListener('click', (e) => {
	// Remove Contact from UI
	UI.deleteContact(e.target);
  
	// Remove Contact from store
	Store.removeContact(e.target.parentElement.previousElementSibling.textContent);
  
	// Show success message
	UI.showAlert('Contact Removed', 'green');
  });