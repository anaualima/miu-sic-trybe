import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const {
      trackName,
      previewUrl,
    } = this.props;
    return (
      <div>
        <li>{ trackName }</li>
        <span>{ previewUrl }</span>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.shape.isRequired,
  previewUrl: PropTypes.shape.isRequired,
};
