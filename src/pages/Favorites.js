import React, { Component } from 'react';
import Header from '../components/Header';

export default class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>FAVORITOS</h1>
      </div>
    );
  }
}
