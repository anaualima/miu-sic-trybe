import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      logged: false,
    };
    this.saveLogin = this.saveLogin.bind(this);
  }

  componentDidMount() {
    this.saveLogin();
  }

  async saveLogin() {
    this.setState({
      logged: true,
    });
    const response = await getUser();
    const { name } = response;
    this.setState({
      logged: false,
      name,
    });
  }

  render() {
    const { logged, name } = this.state;
    if (logged) return <Loading />;

    return (
      <header data-testid="header-component">
        <h1>TRYBE TUNES</h1>
        <p data-testid="header-user-name">{ name }</p>
        )
      </header>
    );
  }
}
