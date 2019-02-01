import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlaylistDetailsActions } from '../../store/ducks/playlistDetails';
import { Creators as PlayerActions } from '../../store/ducks/player';

import { Container, Header, SongList, SongItem } from './styles';

import ClockIcon from '../../assets/images/clock.svg';
import PlusIcon from '../../assets/images/plus.svg';

import Loading from '../../components/Loading';

class Playlist extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }).isRequired,
    getPlaylistDetailsRequest: PropTypes.func.isRequired,
    playlistDetails: PropTypes.shape({
      data: PropTypes.shape({
        thumbnail: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        songs: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.title,
            author: PropTypes.string,
            album: PropTypes.string
          })
        )
      }),
      loading: PropTypes.bool
    }).isRequired,
    loadSong: PropTypes.func.isRequired,
    currentSong: PropTypes.shape({
      id: PropTypes.number
    }).isRequired
  };

  state = {
    selectedSong: null
  };

  componentDidMount() {
    this.loadPlaylistDetails();
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    if (prevProps.match.params.id !== id) {
      this.loadPlaylistDetails();
    }
  }

  loadPlaylistDetails = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const { getPlaylistDetailsRequest } = this.props;

    getPlaylistDetailsRequest(id);
  };

  renderDetails = () => {
    const {
      playlistDetails: { data },
      loadSong,
      currentSong
    } = this.props;

    const { selectedSong } = this.state;

    return (
      <Container>
        <Header>
          <img src={data.thumbnail} alt={data.title} />

          <div>
            <span>Playlist</span>
            <h1>{data.title}</h1>
            {!!data.songs && <p>{data.songs.length} músicas</p>}
            <button type="button">Play</button>
          </div>
        </Header>

        <SongList cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <th />
              <th>Título</th>
              <th>Artista</th>
              <th>Álbum</th>
              <th>
                <img src={ClockIcon} alt="Duração" />
              </th>
            </tr>
          </thead>
          <tbody>
            {!data.songs ? (
              <tr>
                <td colSpan={5}>Nenhuma música cadastrad</td>
              </tr>
            ) : (
              data.songs.map(song => (
                <SongItem
                  key={song.id}
                  onClick={() => this.setState({ selectedSong: song.id })}
                  onDoubleClick={() => loadSong(song)}
                  selected={selectedSong === song.id}
                  playing={currentSong && currentSong.id === song.id}
                >
                  <td>
                    <img src={PlusIcon} alt="Adicionar" />
                  </td>
                  <td>{song.title}</td>
                  <td>{song.author}</td>
                  <td>{song.album}</td>
                  <td>3:45</td>
                </SongItem>
              ))
            )}
          </tbody>
        </SongList>
      </Container>
    );
  };

  render() {
    const {
      playlistDetails: { loading }
    } = this.props;

    return loading ? (
      <Container loading>
        <Loading />
      </Container>
    ) : (
      this.renderDetails()
    );
  }
}

const mapStateToProps = state => ({
  playlistDetails: state.playlistDetails,
  currentSong: state.player.currentSong
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...PlaylistDetailsActions,
      ...PlayerActions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
