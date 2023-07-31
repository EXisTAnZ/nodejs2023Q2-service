import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import DBEngine from 'src/db/db.engine';
import { ERROR_MSG } from 'src/utils/constants';

@Injectable()
export class TrackService {
  private dbEngine: DBEngine = new DBEngine();

  create(createTrackDto: CreateTrackDto) {
    return this.dbEngine.addTrack(createTrackDto);
  }

  findAll() {
    return this.dbEngine.getTracks();
  }

  findOne(id: string) {
    const track = this.dbEngine.existedTrack(id);
    if (!track) throw new NotFoundException(ERROR_MSG.NOT_FOUND_TRACK);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.dbEngine.existedTrack(id);
    if (!track) throw new NotFoundException(ERROR_MSG.NOT_FOUND_TRACK);
    return this.dbEngine.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    const track = this.dbEngine.existedTrack(id);
    if (!track) throw new NotFoundException(ERROR_MSG.NOT_FOUND_TRACK);
    return this.dbEngine.deleteTrack(id);
  }
}
