import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { trackCollection, userCollection } from './db';
import { pbkdf2Sync } from 'crypto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';

export default class DBEngine {
  public async getUsers(): Promise<User[]> {
    return userCollection;
  }

  public async getUser(userId: string) {
    return userCollection.find((item) => item.id === userId);
  }

  public async addUser(user: CreateUserDto) {
    const { login, password } = user;
    try {
      const newUser: User = new User(login, this.hashPass(password));
      userCollection.push(newUser);
      return newUser;
    } catch (err) {
      console.log(err.message);
    }
  }

  public async updateUser(userId: string, user: UpdateUserDto) {
    const updateUser = this.existedUser(userId);
    updateUser.update(this.hashPass(user.newPassword));
    return updateUser;
  }

  public async deleteUser(userId: string) {
    const idx = userCollection.findIndex((user) => user.id === userId);
    userCollection.splice(idx);
  }

  public existedLogin(login: string) {
    return userCollection.find((user) => user.login === login);
  }

  public existedUser(userId: string) {
    return userCollection.find((user) => user.id === userId);
  }

  public isAccess(user: User, password: string) {
    return user.password === this.hashPass(password);
  }

  private hashPass(password: string) {
    return pbkdf2Sync(password, 'secret', 5, 64, 'sha256').toString();
  }

  public async getTracks() {
    return trackCollection;
  }

  public async getTrack(trackId: string) {
    return trackCollection.find((track) => track.id === trackId);
  }

  public async addTrack(track: CreateTrackDto) {
    const newTrack = new Track(track);
    trackCollection.push(newTrack);
    return newTrack;
  }

  public async updateTrack(trackId: string, track: UpdateTrackDto) {
    const updatedTrack = await this.getTrack(trackId);
    updatedTrack.name = track.name || updatedTrack.name;
    updatedTrack.albumId = track.albumId || updatedTrack.albumId;
    updatedTrack.artistId = track.artistId || updatedTrack.artistId;
    updatedTrack.duration = track.duration || updatedTrack.duration;
    return updatedTrack;
  }

  public async deleteTrack(trackId: string) {
    const idx = trackCollection.findIndex((track) => track.id === trackId);
    trackCollection.splice(idx);
  }
}
