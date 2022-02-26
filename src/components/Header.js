import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import imgcabecalho from '../images/imgcabecalho.png';

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
      <header data-testid="header-component" className="header">
        <p data-testid="header-user-name">{ name }</p>
        <nav className="container-nav">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="link"
          >
            Search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="link"
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="link"
          >
            Profile
          </Link>
        </nav>
        <img src={ imgcabecalho } alt="logomarca com gato" className="img-cabecalho"/>
      </header>
    );
  }
}
