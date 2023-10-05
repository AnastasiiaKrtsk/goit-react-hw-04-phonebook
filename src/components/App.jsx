import { nanoid } from 'nanoid';
//model.id = nanoid();=> "V1StGXR8_Z5jdHi6B-myT"

import { Component } from 'react';
import ContactForm from './contact-form/ContactForm';
import Contacts from './contacts/Contacts';

const CONTACTS_LS_KEY = 'contacts';
class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(
        CONTACTS_LS_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }
  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem(CONTACTS_LS_KEY));
    if (localData) {
      this.setState({ contacts: localData });
    }
  }
  //*===========================================================
  handleAddContact = (name, number) => {
    const existingContact = this.state.contacts.find(
      contact =>
        contact.name.trim().toLowerCase() === name.trim().toLowerCase() ||
        contact.number.trim() === number.trim()
    );
    //*--------------
    if (existingContact) {
      alert(
        `Contact with the name "${name}" or number "${number}" already exists.`
      );
      return;
    }
    //*--------------
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };
  //*===========================================================
  onDeleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  onFilterChange = e => {
    const inputValue = e.target.value;
    this.setState({ filter: inputValue });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact => {
      return contact.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase());
    });

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />
        <div>
          <p>Find post</p>
          <input
            onChange={this.onFilterChange}
            value={this.state.filter}
            type="text"
          />
        </div>
        <h2>Contacts</h2>
        <Contacts
          contacts={filteredContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
