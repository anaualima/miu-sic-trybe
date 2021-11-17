import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      logged: false,
      checked: false,
      favorites: [],
    };
    this.favSongs = this.favSongs.bind(this);
    this.checkMusic = this.checkMusic.bind(this);
  }

  componentDidMount() {
    this.favSongs();
  }

  // requisito 10;
  async favSongs() {
    const responseFav = await getFavoriteSongs();
    this.setState({
      favorites: responseFav,
    });
  }

  // auxílio de Nathalia Miranda;
  async checkMusic({ target: { value } }) {
    this.setState({
      logged: true,
      checked: true,
    });
    await addSong(value);
    this.setState({
      logged: false,
    });
  }

  render() {
    const {
      logged,
      checked,
      favorites,
    } = this.state;
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;
    if (logged) return <Loading />;
    return (
      <div>
        <label htmlFor="checkbox-music">
          Favorita
          <input
            type="checkbox"
            id="checkbox-music"
            defaultChecked={ checked }
            name={ favorites }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.checkMusic }
          />
        </label>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
