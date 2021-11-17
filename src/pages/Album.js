import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      responseArr: [],
      logged: false,
    };

    this.apiMusic = this.apiMusic.bind(this);
    this.musics = this.musics.bind(this);
  }

  componentDidMount() {
    this.apiMusic();
  }

  async apiMusic() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      logged: true,
    });
    const responseMusics = await getMusics(id);
    if (responseMusics !== undefined) {
      this.setState({
        responseArr: responseMusics,
        logged: false,
      });
    }
  }

  musics() {
    const { responseArr } = this.state;
    return responseArr
    // esse filter serve para pegar as musicas válidas, as que realmente tem o trackName e o trackId;
    // Auxílio do colega Gabriel Fontes;
      .filter((m) => m.trackName && m.previewUrl)
      .map((u, i) => (
        <MusicCard
          key={ i }
          trackId={ u.trackId }
          trackName={ u.trackName }
          previewUrl={ u.previewUrl }
        />));
  }

  render() {
    const { responseArr, logged } = this.state;
    if (logged) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />

        {responseArr.length > 0 && (
          <div>
            <div>
              <h1 data-testid="album-name">
                {responseArr[0].collectionName}
              </h1>
              <p data-testid="artist-name">
                {responseArr[0].artistName}
              </p>
            </div>
            {this.musics()}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
