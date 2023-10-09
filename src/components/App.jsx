import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contact-form/ContactForm';
import Contacts from './contacts/Contacts';

const CONTACTS_LS_KEY = 'contacts';

function App() {
  const [contacts, setContacts] = useState(() => {
    const localData = JSON.parse(localStorage.getItem(CONTACTS_LS_KEY));
    return localData || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS_LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const existingContact = contacts.find(
      contact =>
        contact.name.trim().toLowerCase() === name.trim().toLowerCase() ||
        contact.number.trim() === number.trim()
    );

    if (existingContact) {
      alert(
        `Contact with the name "${name}" or number "${number}" already exists.`
      );
      return;
    }

    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const onDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const onFilterChange = e => {
    const inputValue = e.target.value;
    setFilter(inputValue);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <div>
        <p>Find post</p>
        <input onChange={onFilterChange} value={filter} type="text" />
      </div>
      <h2>Contacts</h2>
      <Contacts contacts={filteredContacts} onDeleteContact={onDeleteContact} />
    </div>
  );
}

export default App;
