import { v4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';

export class Artist {
  public id: string;
  public name: string;
  public grammy: boolean;

  constructor(createArtistDto: CreateArtistDto) {
    this.id = v4();
    this.name = createArtistDto.name;
    this.grammy = createArtistDto.grammy;
  }
}
