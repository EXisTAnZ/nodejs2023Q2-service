import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import DBEngine from 'src/db/db.engine';

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
    return this.dbEngine.getTrack(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.dbEngine.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    return this.dbEngine.deleteTrack(id);
  }
}
