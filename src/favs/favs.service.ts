import { Injectable } from '@nestjs/common';

@Injectable()
export class FavsService {
  findAll() {
    return `This action returns all favs`;
  }

  addArtistToFavs(id: string) {
    return `This action adds artist #${id} to favs`;
  }

  removeArtistFromFavs(id: string) {
    return `This action removes a #${id} fav`;
  }

  addAlbumToFavs(id: string) {
    return `This action adds album #${id} to favs`;
  }

  removeAlbumFromFavs(id: string) {
    return `This action removes a #${id} fav`;
  }

  addTrackToFavs(id: string) {
    return `This action adds track #${id} to favs`;
  }

  removeTrackFromFavs(id: string) {
    return `This action removes a #${id} fav`;
  }
}
