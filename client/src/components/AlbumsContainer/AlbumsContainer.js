import React, { Component } from 'react'
// import { ThemeContext, themes } from '../../theme'
import { Route } from 'react-router-dom'
import Album from '../Album'
import VerticalMenu from '../VerticalMenu/VerticalMenu'
import { client } from '../../Client'
import PropTypes from 'prop-types'

const ALBUM_IDS = [
  '4ebl4DkNgSpTZENGHJiLjr',
  '2VmQGpWKaY67unFwQD7pWq',
  '0WmjbbIMR4E6513iQwSSZ6',
  '7ovdjtmV0Bkm4Xb4pqtrZt',
  '0JiHJJGVSHzQMdTJ2fp9dh',
  '1eFiIv1SqrUJHOFf54U27W',
  '2DfCUL2TD3yIMNUErFErWb',
  '6fsntTpyamqiTKpFUYo99b',
  '4Tzesw6GpwrIDYPLMi6CiE',
  '141dWZuGtAMbX1iFFui7vC',
]
class AlbumsContainer extends Component {
  state = {
    fetched: false,
    albums: [],
  }

  componentDidMount() {
    this.getAlbums()
  }

  getAlbums = () => {
    client.getAlbum(ALBUM_IDS).then(albums =>
      this.setState({
        fetched: true,
        albums: albums,
      }),
    )
  }

  render() {
    const fetched = this.state
    if (!fetched) {
      return <div className="ui active centered inline loader" />
    } else {
      const matchPath = this.props.match.path
      const albums = this.state
      return (
        <div className="ui two column divided grid">
          <div className="ui six wide column" style={{ maxWidth: 250 }}>
            <VerticalMenu albums={albums} albumsPathname={matchPath} />
          </div>
          <div className="ui ten wide column">
            <Route
              path={`${matchPath}/:albumId`}
              render={({ match }) => {
                const album = albums.find(a => a.id === match.params.albumId)
                return <Album album={album} albumsPathname={matchPath} />
              }}
            />
          </div>
        </div>
      )
    }
  }
}

AlbumsContainer.propTypes = {
  match: PropTypes.func,
  path: PropTypes.string,
}

export default AlbumsContainer
