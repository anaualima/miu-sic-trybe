import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchArtist: '',
      isDisableButton: true,
      logged: false,
      reponseArr: '',
      responseArtist: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.searchAlbum = this.searchAlbum.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.enableButton); // Chama ao função, ao mesmo tempo que recebe o input ativa o botão;
  }

  enableButton() {
    const { searchArtist } = this.state;
    const minNumber = 2;
    if (searchArtist.length >= minNumber) {
      this.setState({
        isDisableButton: false,
      });
    } else {
      this.setState({
        isDisableButton: true,
      });
    }
  }

  async searchAlbum(searchArtist) {
    this.setState({
      logged: true,
    });
    const response = await searchAlbumsAPI(searchArtist);
    this.setState({
      logged: false,
      searchArtist: '',
      reponseArr: response,
      responseArtist: searchArtist, // precisa da resposta do nome de um artista válido;
    });
  }

  render() {
    const {
      isDisableButton,
      searchArtist,
      logged,
      reponseArr,
      responseArtist,
    } = this.state;
    if (logged) return <Loading />;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="searchArtist">
            <input
              type="text"
              name="searchArtist"
              id="searchArtist"
              value={ searchArtist }
              onChange={ this.onInputChange }
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="button"
            name=" isDisableButton"
            data-testid="search-artist-button"
            disabled={ isDisableButton }
            onClick={ () => this.searchAlbum(searchArtist) }
          >
            Pesquisar
          </button>
        </form>
        <h3>{`Resultado de álbuns de: ${responseArtist}`}</h3>
        <section className="container-seacrh">
          { reponseArr.length === 0 ? <p>Nenhum álbum foi encontrado</p>
            : reponseArr.map((a) => (
              <AlbumCard
                key={ a.artistId }
                artistId={ a.artistId }
                artistName={ a.artistName }
                collectionId={ a.collectionId }
                collectionName={ a.collectionName }
                collectionPrice={ a.collectionPrice }
                artworkUrl100={ a.artworkUrl100 }
                releaseDate={ a.releaseDate }
                trackCount={ a.trackCount }
              />
            ))}
        </section>
      </div>
    );
  }
}
