import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class AlbumCard extends Component {
  render() {
    const {
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;

    // recebe o id feito no requisito 7, a função getMusics pega o id;
    // que está na propriedade macth(params) do state, e encaixa no link;
    return (
      <div key={ artistId } className="album-card">
        <p>{ artistId }</p>
        <h3>{ artistName }</h3>
        <p>{ collectionId }</p>
        <p>{ collectionName }</p>
        <p>{ collectionPrice }</p>
        <Link
          to={ `album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          { artistName }
        </Link>
        <img src={ artworkUrl100 } alt={ artistName } />
        <p>{releaseDate}</p>
        <p>{trackCount}</p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
};
