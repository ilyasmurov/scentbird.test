import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

import styles from './Forms.css';

// card patterns (visa, mastercard, etc)
const CardPatterns = {
  visaPattern: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
  mastPattern: /^(?:5[1-5][0-9]{14})$/,
  amexPattern: /^(?:3[47][0-9]{13})$/,
  discPattern: /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/
}

// fields settings & validations
const FieldTypes = {

  // email
  'email': {
    title: 'Email address',
    r: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    messages: {
      'INVALID': 'Email invalid'
    },
    displayType: 'text'
  },

  // password
  'password': {
    title: 'Password',
    r: /^.{10,}$/,
    messages: {
      'INVALID': 'Password too short, must be at least 10 symbols'
    },
    displayType: 'text'
  },

  // code
  'code': {
    title: 'Code',
    dataType: 'number'
  },

  // card number
  'card_number': {
    validate: (value) => {
      const number = value.replace(/\s/g, '');
      const isVisa = CardPatterns.visaPattern.test(number) === true;
      const isMast = CardPatterns.mastPattern.test(number) === true;
      const isAmex = CardPatterns.amexPattern.test(number) === true;
      const isDisc = CardPatterns.discPattern.test(number) === true;

      if (isVisa || isMast || isAmex || isDisc) {
        return true;
      } else {
        return false;
      }
    },
    format: '#### #### #### #### ###',
    dataType: 'number',
    messages: {
      'INVALID': 'Please enter a valid card number.'
    }
  },

  // card security code
  'card_security': {
    format: '###',
    dataType: 'number'
  },

  // card month
  'card_month': {
    // format: '##/##',
    // mask: ['M', 'M', 'Y', 'Y']
  },

  // card year
  'card_year': {
    format: '####',
    dataType: 'number'
  },

  // default settings
  'default': {
    messages: {
      'EMPTY': 'This field is required'
    }
  }
}

class Input extends Component {
  constructor(props) {
    super(props);
    const { name, require, type } = this.props;
    this.state = {
      focus: false,
      transformation: false,
      value: '',
      status: '',
      submit: false,
      type: type,
      dataType: (FieldTypes[type] && FieldTypes[type].dataType) ? FieldTypes[type].dataType : 'text' 
    }

    if (this.props.onUpdate) {
      this.props.onUpdate({
        name: name,
        value: '',
        type: type,
        require: require || false
      });
    }
  }

  focusHandler = () => {
    this.setState({
      focus: true,
      transformation: true,
      status: '',
      submit: false
    })
  }

  blurHandler = () => {
    const { value } = this.state;
    this.setState({
      transformation: !value.length ? false : true,
      focus: false,
      status: '',
      submit: false
    })
  }

  changeHandler = e => {
    const { name, type, require } = this.props;
    this.props.onUpdate({
      name: name,
      value: e.target.value,
      type: type,
      require: require || false
    });
    this.setState({
      value: e.target.value
    })
  }

  componentWillReceiveProps(nextProps) {
    const { submit, type, require, name } = nextProps;
    const { value } = this.state;
    if (submit) {
      this.setState({
        submit: false
      })
      if (!this.state.submit) {
        if (submit && require) {
          let status = '';
          if (!value) {
            status = FieldTypes.default.messages['EMPTY'] || 'Unknown error';
          } else {
            if (type) {
              if (FieldTypes[type].r && !FieldTypes[type].r.test(value)) {
                status = FieldTypes[type].messages.INVALID;
              }
              if (FieldTypes[type].validate && !FieldTypes[type].validate(value)) {
                status = FieldTypes[type].messages.INVALID;
              }
            }
          }

          this.setState({
            status: status
          })
          this.props.onUpdate({
            name: name,
            value: value,
            type: type,
            require: require,
            status: status
          });
        }
      }
    }
  }

  render() {
    const { placeholder, type } = this.props;
    const { focus, transformation, status, dataType } = this.state;
    return (
      <div value={this.state.value} className={[styles.field, (focus ? styles.focus : ''), (transformation ? styles.transformation : ''), (status.length ? styles.notice : '')].join(' ')}>
        {dataType === 'number'
          
          // format number
          ? <NumberFormat 
              format={FieldTypes[type] && FieldTypes[type].format} 
              mask={FieldTypes[type] && FieldTypes[type].mask} 
              onFocus={this.focusHandler} 
              onBlur={this.blurHandler} 
              onChange={this.changeHandler} 
              className={styles.input} />

          // simple input
          : <input 
              type={type} 
              onFocus={this.focusHandler} 
              onBlur={this.blurHandler} 
              onChange={this.changeHandler} 
              className={styles.input} />

        }
        <label>{placeholder ? placeholder : FieldTypes[type] && FieldTypes[type].title}</label>
        {status &&
          <div className={styles.status}>{status}</div>
        }
      </div>
    )
  }
}

const FieldsGroup = props => (
  <div className={styles.group}>{props.children}</div>
)

const TextField = props => (
  <div className={styles.textField}>{props.children}</div>
)

export {
  Input,
  FieldsGroup,
  TextField
}