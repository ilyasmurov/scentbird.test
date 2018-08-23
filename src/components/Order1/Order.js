import React from 'react';
import styles from './styles.css';

import AccountCreate from './AccountCreate/AccountCreate';

const Order = () => (
  <div className="container">
    <h1>MONTH-TO-MONTH SUBSCRIPTION</h1>
    <div>Billed monthly. Renews automatically, cancel any time. Free shipping.</div>
    <AccountCreate />
  </div>
)

export default Order;