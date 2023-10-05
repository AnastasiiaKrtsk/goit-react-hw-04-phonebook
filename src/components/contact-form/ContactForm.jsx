import React, { Component } from 'react';
import styles from './ContactForm.module.css';

//*BEFORE-------
// const ContactForm = ({
//   name,
//   number,
//   handleNameChange,
//   handleNumberChange,
//   handleSubmit,
// }) => {
//   const onSubmit = e => {
//     e.preventDefault();
//     handleSubmit();
//   };
//*BEFORE-------

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  //?????????????????????????????????????????????????????????????????????????????
  onSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.onAddContact(name, number);
    this.setState({ name: '', number: '' });
  };

  handleNameChange = e => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, '');
    this.setState({
      name: value,
    });
  };

  formatPhoneNumber = input => {
    const value = input.replace(/\D/g, '');
    const formattedValue = value
      .slice(0, 10)
      .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    return formattedValue;
  };

  handleNumberChange = e => {
    const formattedNumber = this.formatPhoneNumber(e.target.value);
    this.setState({ number: formattedNumber });
  };

  render() {
    const { name, number } = this.state;

    return (
      <section>
        <form onSubmit={this.onSubmit} className={styles.formStyle}>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={this.handleNameChange}
            maxLength={20}
            placeholder="Name"
            className={styles.inputStyle}
          />
          <input
            type="tel"
            name="number"
            required
            value={number}
            onChange={this.handleNumberChange}
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
}

export default ContactForm;
