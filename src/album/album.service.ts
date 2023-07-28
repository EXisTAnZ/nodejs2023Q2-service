import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import DBEngine from 'src/db/db.engine';
import { ERROR_MSG } from 'src/utils/constants';

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
    const album = this.dbEngine.existedAlbum(id);
    if (!album) throw new NotFoundException(ERROR_MSG.NOT_FOUND_ALBUM);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.dbEngine.existedAlbum(id);
    if (!album) throw new NotFoundException(ERROR_MSG.NOT_FOUND_ALBUM);
    return this.dbEngine.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    const album = this.dbEngine.existedAlbum(id);
    if (!album) throw new NotFoundException(ERROR_MSG.NOT_FOUND_ALBUM);
    return this.dbEngine.deleteAlbum(id);
  }
}
