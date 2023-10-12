import React, { useState } from 'react';
import styles from './ContactForm.module.css';

function ContactForm({ onAddContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    onAddContact(name, number);
    setName('');
    setNumber('');
  };

  const handleNameChange = e => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, '');
    setName(value);
  };

  const formatPhoneNumber = input => {
    const value = input.replace(/\D/g, '');
    const formattedValue = value
      .slice(0, 10)
      .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    return formattedValue;
  };

  const handleNumberChange = e => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setNumber(formattedNumber);
  };

  return (
    <section>
      <form onSubmit={onSubmit} className={styles.formStyle}>
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={handleNameChange}
          maxLength={20}
          placeholder="Name"
          className={styles.inputStyle}
        />
        <input
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleNumberChange}
          placeholder="Phone Number"
          className={styles.inputStyle}
        />
        <button type="submit" className={styles.buttonStyle}>
          Add Contact
        </button>
      </form>
    </section>
  );
}

export default ContactForm;
