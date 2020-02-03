import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/';

import './ContactData.css';

const ContactData = ({ 
  ingredients, 
  totalPrice, 
  onOrderBurger, 
  loading, 
  purchased,
  token 
}) => {
  const [order, setOrder] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        placeholder: 'Your postal code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your email'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          {value: 'fastest', displayValue: 'Fastest'},
          {value: 'cheapest', displayValue: 'Cheapest'},
        ]
      },
      validation: {},
      value: 'fastest',
      valid: true
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (evt) => {
    evt.preventDefault();

    const formData = order;
    for (let formElementIdentifier in order) {
      formData[formElementIdentifier] = order[formElementIdentifier].value;
    }

    const request = {
      ingredients,
      price: totalPrice,
      orderData: formData
    }

    onOrderBurger(request, token);
  }

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  const inputChangedHandler = (evt, inputIdentifier) => {
    const updatedOrder = {
      ...order,
    }

    const updatedFormElement = {
      ...updatedOrder[inputIdentifier]
    };
    updatedFormElement.value = evt.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;

    updatedOrder[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrder) {
      formIsValid = updatedOrder[inputIdentifier].valid && formIsValid;
    }
    setFormIsValid(formIsValid);
    setOrder(updatedOrder);
  }

  const formElementsArray = [];
  for (let key in order) {
    formElementsArray.push({
      id: key,
      config: order[key]
    })
  }

  return(
    <div className="ContactData">
      {
        loading ?
        <Spinner /> :
        <>
          <h4>Enter your contact data</h4>
          <form onSubmit={orderHandler}>
            {
              formElementsArray.map(formElement => (
                <Input
                  key={formElement.id} 
                  elementType={formElement.config.elementType} 
                  elementConfig={formElement.config.elementConfig} 
                  value={formElement.config.value} 
                  changed={evt => inputChangedHandler(evt, formElement.id)}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  invalid={!formElement.config.valid}
                />
              ))
            }
            <Button 
              btnType="Success"
              disabled={!formIsValid}
            >
              ORDER
            </Button>
          </form>
        </>
      }
      {
        purchased && <Redirect to="/" />
      }
    </div>
  );
};

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  purchased: state.order.purchased,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));