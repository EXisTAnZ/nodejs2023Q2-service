import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import {
  albumCollection,
  artistCollection,
  favsCollection,
  trackCollection,
  userCollection,
} from './db';
import { pbkdf2Sync } from 'crypto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Album } from 'src/album/entities/album.entity';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { PrismaClient } from '@prisma/client';

export default class DBEngine {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    console.log('users in database: ', users);
    return userCollection;
  }

  public async getUser(userId: string) {
    return userCollection.find((item) => item.id === userId);
  }

  public async addUser(user: CreateUserDto) {
    const { login, password } = user;
    try {
      const newUser: User = new User(login, this.hashPass(password));
      await this.prisma.user.create({ data: newUser });
      userCollection.push(newUser);
      return newUser;
    } catch (err) {
      console.log(err.message);
    }
  }

  public async updateUser(userId: string, user: UpdatePasswordDto) {
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
    await this.removeTrackFromFav(trackId);
  }

  public existedTrack(trackId: string) {
    return trackCollection.find((track) => track.id === trackId);
  }

  public async getArtists() {
    return artistCollection;
  }

  public async getArtist(artistId: string) {
    return artistCollection.find((artist) => artist.id === artistId);
  }

  public async addArtist(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist(createArtistDto);
    artistCollection.push(newArtist);
    return newArtist;
  }

  public async updateArtist(
    artistId: string,
    updateArtistDto: UpdateArtistDto,
  ) {
    const updatedArtist = this.existedArtist(artistId);
    updatedArtist.name = updateArtistDto.name || updatedArtist.name;
    updatedArtist.grammy = updateArtistDto.grammy ?? updatedArtist.grammy;
    return updatedArtist;
  }

  public async deleteArtist(artistId: string) {
    const idx = artistCollection.findIndex((artist) => artist.id === artistId);
    artistCollection.splice(idx);
    const tracks = trackCollection.filter(
      (track) => track.artistId === artistId,
    );
    tracks.every((track) => track.removeArtist());
    const albums = albumCollection.filter(
      (album) => album.artistId === artistId,
    );
    albums.every((album) => album.removeArtist());
    await this.removeArtistFromFav(artistId);
  }

  public existedArtist(artistId: string) {
    return artistCollection.find((artist) => artist.id === artistId);
  }

  public async getAlbums() {
    return albumCollection;
  }

  public async getAlbum(albumId: string) {
    return albumCollection.find((album) => album.id === albumId);
  }

  public async addAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new Album(createAlbumDto);
    albumCollection.push(newAlbum);
    return newAlbum;
  }

  public async updateAlbum(albumId: string, updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum = this.existedAlbum(albumId);
    updatedAlbum.name = updateAlbumDto.name || updatedAlbum.name;
    updatedAlbum.year = updateAlbumDto.year || updatedAlbum.year;
    updatedAlbum.artistId = updateAlbumDto.artistId || updatedAlbum.artistId;
    return updatedAlbum;
  }

  public async deleteAlbum(albumId: string) {
    const idx = albumCollection.findIndex((album) => album.id === albumId);
    albumCollection.splice(idx);
    const tracks = trackCollection.filter((track) => track.albumId === albumId);
    tracks.every((track) => track.removeAlbum());
    await this.removeAlbumFromFav(albumId);
  }

  public existedAlbum(albumId: string) {
    return albumCollection.find((album) => album.id === albumId);
  }

  public async getFavs() {
    return favsCollection;
  }

  public async addArtistToFavs(artistId: string) {
    const artist = this.existedArtist(artistId);
    favsCollection.artists.push(artist);
  }

  public async removeArtistFromFav(artistId: string) {
    const idx = favsCollection.artists.findIndex(
      (artist) => artist.id === artistId,
    );
    favsCollection.artists.splice(idx);
    return idx !== -1;
  }

  public async addAlbumToFavs(albumId: string) {
    const album = this.existedAlbum(albumId);
    favsCollection.albums.push(album);
  }

  public async removeAlbumFromFav(albumId: string) {
    const idx = favsCollection.albums.findIndex(
      (album) => album.id === albumId,
    );
    favsCollection.albums.splice(idx);
    return idx !== -1;
  }

  public async addTrackToFavs(trackId: string) {
    const track = this.existedTrack(trackId);
    favsCollection.tracks.push(track);
  }

  public async removeTrackFromFav(trackId: string) {
    const idx = favsCollection.tracks.findIndex(
      (track) => track.id === trackId,
    );
    favsCollection.tracks.splice(idx);
    return idx !== -1;
  }
}
