import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <h1>SEACRH</h1>
        <Header />
      </div>
    );
  }
}
