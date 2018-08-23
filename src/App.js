import React, { Component } from 'react';
import styles from './App.css';
import Logo from './logo.svg';

import Order from './layouts/Order';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.logo}><img src={Logo} /></div>
        <Order />
      </div>
    );
  }
}

export default App;
