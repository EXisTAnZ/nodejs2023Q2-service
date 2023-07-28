import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import DBEngine from 'src/db/db.engine';
import { ERROR_MSG } from 'src/utils/constants';

@Injectable()
export class ArtistService {
  private dbEngine: DBEngine = new DBEngine();

  create(createArtistDto: CreateArtistDto) {
    return this.dbEngine.addArtist(createArtistDto);
  }

  findAll() {
    return this.dbEngine.getArtists();
  }

  findOne(id: string) {
    const artist = this.dbEngine.existedArtist(id);
    if (!artist) throw new NotFoundException(ERROR_MSG.NOT_FOUND_ARTIST);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.dbEngine.existedArtist(id);
    if (!artist) throw new NotFoundException(ERROR_MSG.NOT_FOUND_ARTIST);
    return this.dbEngine.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    const artist = this.dbEngine.existedArtist(id);
    if (!artist) throw new NotFoundException(ERROR_MSG.NOT_FOUND_ARTIST);
    return this.dbEngine.deleteArtist(id);
  }
}
