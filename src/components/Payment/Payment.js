import React, { Component } from 'react';

import { FieldsGroup, Input, TextField } from '../UI/Forms/Forms';
import styles from './Payment.css';
import Encryption from './encryption.svg';
import Cards from './icon-cc-all.svg';


class Payment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submit: false
    }
  }

  onUpdate = obj => {
    this.props.onUpdate(obj)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      submit: nextProps.submit
    })
  }
  
  render() {
    return (
      <div className={styles.container}>
        <div className={[styles.wrapper, styles.encryptionContainer].join(' ')}>
          <div className={styles.encryptionWrapper}>
            <div><img src={Encryption} /></div>
            <div className={styles.encryption}>128-BIT ENCRYPTION. YOU’RE SAFE</div>
          </div>
          <div className={styles.cards}><img src={Cards} alt='' /></div>
        </div>
        <FieldsGroup>
          <Input require name='card_number' type='card_number' width='2' placeholder='Credit card number' onUpdate={this.onUpdate} submit={this.state.submit} />
          <Input require name='card_security' type='card_security' width='1' placeholder='Security code' onUpdate={this.onUpdate} submit={this.state.submit} />
        </FieldsGroup>
        <FieldsGroup>
          <Input require name='card_month' type='card_month' placeholder='Month' onUpdate={this.onUpdate} submit={this.state.submit} />
          <Input require name='card_year' type='card_year' placeholder='Year' onUpdate={this.onUpdate} submit={this.state.submit} />
          <TextField>Exp.</TextField>
        </FieldsGroup>
      </div>
    )
  }
}

export default Payment;