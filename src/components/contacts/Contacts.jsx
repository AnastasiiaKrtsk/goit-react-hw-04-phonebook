import React from 'react';
import styles from './Contacts.module.css';

const Contacts = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={styles['contacts-list']}>
      {contacts.map(contact => (
        <li key={contact.id} className={styles['contact-item']}>
          <div className={styles['contact-details']}>
            {contact.name}: {contact.number}
          </div>
          <button
            onClick={() => onDeleteContact(contact.id)}
            className={styles['delete-button']}
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
