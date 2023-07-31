import { v4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';

export class Album {
  public id: string; // uuid v4
  public name: string;
  public year: number;
  public artistId: string | null; // refers to Artist

  constructor(createAlbumDto: CreateAlbumDto) {
    this.id = v4();
    this.name = createAlbumDto.name;
    this.year = createAlbumDto.year;
    this.artistId = createAlbumDto.artistId;
  }

  public removeArtist() {
    this.artistId = null;
  }
}
