import React, { Component } from 'react';

import ProductInfo from '../components/ProductInfo/ProductInfo';
import Group from '../components/Group/Group';
import { FieldsGroup, Input, TextField } from '../components/UI/Forms/Forms';
import Payment from '../components/Payment/Payment';

import styles from '../App.css';
import stylesFields from '../components/UI/Forms/Forms.css';
import Arrow from '../components/UI/Forms/arrow.svg';

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      submit: false,
      billing: false
    }
  }

  onUpdate = obj => {
    let fields = this.state.fields;
    if (obj !== fields[obj.name]) {
      fields[obj.name] = obj;
      this.setState({
        fields: fields,
        submit: false
      })
    }
  }
  
  handleSubmit = () => {
    this.setState({
      submit: true
    }, () => {
      let flag = true;
      console.log(this.state.fields);
      Object.keys(this.state.fields).forEach(key => {
        const item = this.state.fields[key];
        if (item.status && item.status.length) flag = false;
      });
      if (flag) {
        alert('submit');
      }
    })
  }

  checkboxHandler = () => {

  }

  render () {
    const { billing } = this.state;
    return (
      <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.desktop}>Month-to-month subscription</h1>
            <h1 className={styles.mobile}>MONTHLY SUBSCRIPTION</h1>
            <div className={styles.subtitle}>Billed monthly. Renews automatically, cancel any time. Free shipping.</div>
            <div className={styles.aside}>
              <ProductInfo />
            </div>
            <Group title='Create account'>
              <FieldsGroup>
                <Input require name='email' type='email' onUpdate={this.onUpdate} submit={this.state.submit} />
                <Input require name='password' type='password' onUpdate={this.onUpdate} submit={this.state.submit} />
              </FieldsGroup>
            </Group>
            <Group title='Shipping address'>
              <FieldsGroup> 
                <Input require name='address' placeholder='Street address' onUpdate={this.onUpdate} submit={this.state.submit} />
                <Input name='suite' placeholder='Apt/Suite (Optional)' onUpdate={this.onUpdate} submit={this.state.submit} />
              </FieldsGroup>
              <FieldsGroup> 
                <Input require name='first_name' placeholder='First Name' onUpdate={this.onUpdate} submit={this.state.submit} />
                <Input require name='last_name' placeholder='Last Name' onUpdate={this.onUpdate} submit={this.state.submit} />
              </FieldsGroup>
              <FieldsGroup>
                <Input require name='code' type='code' onUpdate={this.onUpdate} submit={this.state.submit} />
                <Input require name='city' placeholder='City' onUpdate={this.onUpdate} submit={this.state.submit} />
                <Input require name='town' placeholder='Town' onUpdate={this.onUpdate} submit={this.state.submit} />
              </FieldsGroup>
              <FieldsGroup>
                <Input require name='country' placeholder='Country' onUpdate={this.onUpdate} submit={this.state.submit} />
              </FieldsGroup>
              <FieldsGroup>
                <Input name='mobile' placeholder='Mobile number (Optional)' onUpdate={this.onUpdate} submit={this.state.submit} />
                <TextField>We may send you special discounts and offers</TextField>
              </FieldsGroup>
              <FieldsGroup>
                <input id='billing' type='checkbox' onChange={() => this.setState({'billing': !billing})} /> <label htmlFor='billing'>Use this address as my billing address</label>
              </FieldsGroup>
            </Group>
            {billing &&
              <Group title='Billing address'>
                <FieldsGroup> 
                  <Input require name='billing_first_name' placeholder='First Name' onUpdate={this.onUpdate} submit={this.state.submit} />
                  <Input require name='billing_last_name' placeholder='Last Name' onUpdate={this.onUpdate} submit={this.state.submit} />
                </FieldsGroup>
                <FieldsGroup>
                  <Input require name='billing_code' type='code' onUpdate={this.onUpdate} submit={this.state.submit} />
                  <Input require name='billing_city' placeholder='City' onUpdate={this.onUpdate} submit={this.state.submit} />
                  <Input require name='billing_town' placeholder='Town' onUpdate={this.onUpdate} submit={this.state.submit} />
                </FieldsGroup>
                <FieldsGroup>
                  <Input require name='billing_country' placeholder='Country' onUpdate={this.onUpdate} submit={this.state.submit} />
                </FieldsGroup>
              </Group>
            }
            <Group title='Secure credit card payment'>
              <Payment onUpdate={this.onUpdate} submit={this.state.submit} />
            </Group>
            <div className={[stylesFields.field, stylesFields.submit].join(' ')}>
              <button onClick={this.handleSubmit}>Confirm <img src={Arrow} /></button>
            </div>
          </div>
      </div>
    )
  }
}

export default Order;