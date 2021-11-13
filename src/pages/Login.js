import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDisableButton: true,
      logged: false,
      redirect: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.loginAndRedirect = this.loginAndRedirect.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.enableButton); // Chama ao função, ao mesmo tempo que recebe o input ativa o botão;
  }

  enableButton() {
    const { name } = this.state;
    const minName = 3;
    if (name.length >= minName) {
      this.setState({
        isDisableButton: false,
      });
    } else {
      this.setState({
        isDisableButton: true,
      });
    }
  }

  async loginAndRedirect(name) {
    this.setState({
      logged: true,
    });
    await createUser(name);
    this.setState({
      name,
      logged: false,
      redirect: true,
    });
  }

  render() {
    const { isDisableButton, name, logged, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      logged ? (<Loading />) : (
        <div data-testid="page-login">
          <form>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                id="name"
                name="name"
                value={ name }
                onChange={ this.onInputChange }
                data-testid="login-name-input"
              />
            </label>
            <button
              name="isDisableButton"
              type="button"
              data-testid="login-submit-button"
              disabled={ isDisableButton }
              onClick={ () => this.loginAndRedirect({ name }) }
            >
              Entrar
            </button>
          </form>
        </div>)
    );
  }
}
