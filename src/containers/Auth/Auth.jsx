import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/';

import './Auth.css';

const Auth = ({ onAuth, loading, err }) => {
  const history = useHistory();
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your Email',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Your Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  useEffect(() => {
    if (err) {
      message.error(err);
    }
  }, [err]);

  const [isSignup, setIsSignup] = useState(false);

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (evt, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: evt.target.value,
        valid: checkValidity(
          evt.target.value,
          controls[controlName].validation
        ),
        touched: true,
      },
    };
    setControls(updatedControls);
  };

  const switchAuthModeHandler = () => {
    setIsSignup((prevSignup) => {
      return !prevSignup;
    });
  };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  const form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      changed={(evt) => inputChangedHandler(evt, formElement.id)}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      invalid={!formElement.config.valid}
    />
  ));

  const submitHandler = (evt) => {
    evt.preventDefault();
    onAuth(controls.email.value, controls.password.value, isSignup);
    history.push('/');
  };

  return (
    <div className="Auth">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <form onSubmit={submitHandler}>
            {form}
            <Button btnType="Success">SUBMIT</Button>
          </form>
          <Button clicked={switchAuthModeHandler} btnType="Danger">
            SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
          </Button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  err: state.auth.err,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
