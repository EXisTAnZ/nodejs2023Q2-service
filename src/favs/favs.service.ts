import { Injectable } from '@nestjs/common';
import DBEngine from 'src/db/db.engine';

@Injectable()
export class FavsService {
  private dbEngine: DBEngine = new DBEngine();

  findAll() {
    return this.dbEngine.getFavs();
  }

  addArtistToFavs(id: string) {
    return this.dbEngine.addArtistToFavs(id);
  }

  removeArtistFromFavs(id: string) {
    return this.dbEngine.removeArtistFromFav(id);
  }

  addAlbumToFavs(id: string) {
    return this.dbEngine.addAlbumToFavs(id);
  }

  removeAlbumFromFavs(id: string) {
    return this.dbEngine.removeAlbumFromFav(id);
  }

  addTrackToFavs(id: string) {
    return this.dbEngine.addTrackToFavs(id);
  }

  removeTrackFromFavs(id: string) {
    return this.dbEngine.removeTrackFromFav(id);
  }
}
