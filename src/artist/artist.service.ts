import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import DBEngine from 'src/db/db.engine';

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
    return this.dbEngine.getArtist(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.dbEngine.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    return this.dbEngine.deleteArtist(id);
  }
}
