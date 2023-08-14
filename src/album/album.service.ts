import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import DBEngine from 'src/db/db.engine';

@Injectable()
export class AlbumService {
  private dbEngine: DBEngine = new DBEngine();

  create(createAlbumDto: CreateAlbumDto) {
    return this.dbEngine.addAlbum(createAlbumDto);
  }

  findAll() {
    return this.dbEngine.getAlbums();
  }

  findOne(id: string) {
    return this.dbEngine.getAlbum(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.dbEngine.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    return this.dbEngine.deleteAlbum(id);
  }
}
