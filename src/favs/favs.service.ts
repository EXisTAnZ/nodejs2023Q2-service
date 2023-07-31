import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import DBEngine from 'src/db/db.engine';
import { ERROR_MSG } from 'src/utils/constants';

@Injectable()
export class FavsService {
  private dbEngine: DBEngine = new DBEngine();

  findAll() {
    return this.dbEngine.getFavs();
  }

  addArtistToFavs(id: string) {
    const artist = this.dbEngine.existedArtist(id);
    if (!artist)
      throw new UnprocessableEntityException(ERROR_MSG.NOT_FOUND_ARTIST);
    return this.dbEngine.addArtistToFavs(id);
  }

  removeArtistFromFavs(id: string) {
    const result = this.dbEngine.removeArtistFromFav(id);
    if (!result) throw new NotFoundException(ERROR_MSG.NOT_FOUND_IN_FAVS);
  }

  addAlbumToFavs(id: string) {
    const album = this.dbEngine.existedAlbum(id);
    if (!album)
      throw new UnprocessableEntityException(ERROR_MSG.NOT_FOUND_ALBUM);
    return this.dbEngine.addAlbumToFavs(id);
  }

  removeAlbumFromFavs(id: string) {
    const result = this.dbEngine.removeAlbumFromFav(id);
    if (!result) throw new NotFoundException(ERROR_MSG.NOT_FOUND_IN_FAVS);
  }

  addTrackToFavs(id: string) {
    const track = this.dbEngine.existedTrack(id);
    if (!track)
      throw new UnprocessableEntityException(ERROR_MSG.NOT_FOUND_TRACK);
    return this.dbEngine.addTrackToFavs(id);
  }

  removeTrackFromFavs(id: string) {
    const result = this.dbEngine.removeTrackFromFav(id);
    if (!result) throw new NotFoundException(ERROR_MSG.NOT_FOUND_IN_FAVS);
  }
}
