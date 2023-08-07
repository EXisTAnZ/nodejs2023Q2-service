import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import {
  albumCollection,
  artistCollection,
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
import {
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ERROR_MSG } from 'src/utils/constants';
import { Favs } from 'src/favs/entities/favs.entity';

export default class DBEngine {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getUsers() {
    const users = (await this.prisma.user.findMany()) as Array<User>;
    return users;
  }

  public async getUser(userId: string) {
    const user: User = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException(ERROR_MSG.NOT_FOUND_USER);
    return user;
  }

  public async addUser(user: CreateUserDto) {
    const { login, password } = user;
    try {
      const newUser: User = new User(login, this.hashPass(password));
      await this.prisma.user.create({ data: newUser });
      return newUser;
    } catch (err) {
      console.log(err.message);
    }
  }

  public async updateUser(userId: string, user: UpdatePasswordDto) {
    const updateUser = await this.getUser(userId);
    if (!updateUser) throw new NotFoundException(ERROR_MSG.NOT_FOUND_USER);
    if (!this.isAccess(updateUser, user.oldPassword))
      throw new ForbiddenException(ERROR_MSG.WRONG_PASSWORD);
    updateUser.password = this.hashPass(user.newPassword);
    updateUser.version++;
    updateUser.updatedAt = new Date().getTime();
    await this.prisma.user.update({
      where: { id: userId },
      data: updateUser,
    });
    delete updateUser.password;
    return updateUser;
  }

  public async deleteUser(userId: string) {
    const delUser = await this.getUser(userId);
    if (!delUser) throw new NotFoundException(ERROR_MSG.NOT_FOUND_USER);
    await this.prisma.user.delete({
      where: { id: userId },
    });
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
    return (await this.prisma.track.findMany()) as Array<Track>;
  }

  public async getTrack(trackId: string) {
    const track: Track = await this.prisma.track.findUnique({
      where: {
        id: trackId,
      },
    });
    if (!track) throw new NotFoundException(ERROR_MSG.NOT_FOUND_TRACK);
    return track;
  }

  public async addTrack(track: CreateTrackDto) {
    const newTrack = new Track(track);
    await this.prisma.track.create({ data: newTrack });
    return newTrack;
  }

  public async updateTrack(trackId: string, track: UpdateTrackDto) {
    const updatedTrack = await this.getTrack(trackId);
    if (!updatedTrack) throw new NotFoundException(ERROR_MSG.NOT_FOUND_TRACK);
    updatedTrack.name = track.name || updatedTrack.name;
    updatedTrack.albumId = track.albumId || updatedTrack.albumId;
    updatedTrack.artistId = track.artistId || updatedTrack.artistId;
    updatedTrack.duration = track.duration || updatedTrack.duration;
    await this.prisma.track.update({
      where: {
        id: trackId,
      },
      data: updatedTrack,
    });
    return updatedTrack;
  }

  public async deleteTrack(trackId: string) {
    const delTrack = await this.getTrack(trackId);
    if (!delTrack) throw new NotFoundException(ERROR_MSG.NOT_FOUND_TRACK);
    await this.prisma.track.delete({ where: { id: trackId } });
    await this.removeTrackFromFav(trackId);
  }

  public existedTrack(trackId: string) {
    return trackCollection.find((track) => track.id === trackId);
  }

  public async getArtists() {
    return (await this.prisma.artist.findMany()) as Array<Artist>;
  }

  public async getArtist(artistId: string) {
    const artist: Artist = await this.prisma.artist.findUnique({
      where: {
        id: artistId,
      },
    });
    if (!artist) throw new NotFoundException(ERROR_MSG.NOT_FOUND_ARTIST);
    return artist;
  }

  public async addArtist(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist(createArtistDto);
    await this.prisma.artist.create({ data: newArtist });
    return newArtist;
  }

  public async updateArtist(
    artistId: string,
    updateArtistDto: UpdateArtistDto,
  ) {
    const updatedArtist = await this.getArtist(artistId);
    if (!updatedArtist) throw new NotFoundException(ERROR_MSG.NOT_FOUND_ARTIST);
    updatedArtist.name = updateArtistDto.name || updatedArtist.name;
    updatedArtist.grammy = updateArtistDto.grammy ?? updatedArtist.grammy;
    this.prisma.artist.update({ where: { id: artistId }, data: updatedArtist });
    return updatedArtist;
  }

  public async deleteArtist(artistId: string) {
    const delArtist = await this.getArtist(artistId);
    if (!delArtist) throw new NotFoundException(ERROR_MSG.NOT_FOUND_ARTIST);
    // TODO: need implement remove from albums
    // TODO: need implement remove from tracks
    // TODO: need implement remove from favs
  }

  public existedArtist(artistId: string) {
    return artistCollection.find((artist) => artist.id === artistId);
  }

  public async getAlbums() {
    return (await this.prisma.album.findMany()) as Array<Album>;
  }

  public async getAlbum(albumId: string) {
    const album: Album = await this.prisma.album.findUnique({
      where: {
        id: albumId,
      },
    });
    if (!album) throw new NotFoundException(ERROR_MSG.NOT_FOUND_ALBUM);
    return album;
  }

  public async addAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new Album(createAlbumDto);
    await this.prisma.album.create({ data: newAlbum });
    return newAlbum;
  }

  public async updateAlbum(albumId: string, updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum = await this.getAlbum(albumId);
    if (!updatedAlbum) throw new NotFoundException(ERROR_MSG.NOT_FOUND_ALBUM);
    updatedAlbum.name = updateAlbumDto.name || updatedAlbum.name;
    updatedAlbum.year = updateAlbumDto.year || updatedAlbum.year;
    updatedAlbum.artistId = updateAlbumDto.artistId || updatedAlbum.artistId;
    return updatedAlbum;
  }

  public async deleteAlbum(albumId: string) {
    const delAlbum = await this.getAlbum(albumId);
    if (!delAlbum) throw new NotFoundException(ERROR_MSG.NOT_FOUND_ALBUM);
    await this.removeAlbumFromFav(albumId);
    // TODO: need implement remove from tracks
    // TODO: need implement remove from favs
  }

  public existedAlbum(albumId: string) {
    return albumCollection.find((album) => album.id === albumId);
  }

  public async getFavs() {
    const artists = await this.prisma.artist.findMany({
      where: { fav: true },
    });
    const albums = await this.prisma.album.findMany({
      where: { fav: true },
    });
    const tracks = await this.prisma.track.findMany({
      where: { fav: true },
    });
    return { artists, albums, tracks } as Favs;
  }

  public async addArtistToFavs(artistId: string) {
    const artist = await this.getArtist(artistId);
    if (!artist)
      throw new UnprocessableEntityException(ERROR_MSG.NOT_FOUND_ARTIST);
    await this.prisma.artist.update({
      where: { id: artistId },
      data: { fav: true },
    });
  }

  public async removeArtistFromFav(artistId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artist)
      throw new UnprocessableEntityException(ERROR_MSG.NOT_FOUND_ARTIST);
    if (!artist.fav) throw new NotFoundException(ERROR_MSG.NOT_FOUND_IN_FAVS);

    await this.prisma.artist.update({
      where: { id: artistId },
      data: { fav: false },
    });
  }

  public async addAlbumToFavs(albumId: string) {
    const album = await this.getAlbum(albumId);
    if (!album)
      throw new UnprocessableEntityException(ERROR_MSG.NOT_FOUND_ALBUM);
    await this.prisma.album.update({
      where: { id: albumId },
      data: { fav: true },
    });
  }

  public async removeAlbumFromFav(albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album)
      throw new UnprocessableEntityException(ERROR_MSG.NOT_FOUND_ALBUM);
    if (!album.fav) throw new NotFoundException(ERROR_MSG.NOT_FOUND_IN_FAVS);

    await this.prisma.album.update({
      where: { id: albumId },
      data: { fav: false },
    });
  }

  public async addTrackToFavs(trackId: string) {
    const track = await this.getTrack(trackId);
    if (!track)
      throw new UnprocessableEntityException(ERROR_MSG.NOT_FOUND_TRACK);
    await this.prisma.track.update({
      where: { id: trackId },
      data: { fav: true },
    });
  }

  public async removeTrackFromFav(trackId: string) {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track)
      throw new UnprocessableEntityException(ERROR_MSG.NOT_FOUND_TRACK);
    if (!track.fav) throw new NotFoundException(ERROR_MSG.NOT_FOUND_IN_FAVS);

    await this.prisma.track.update({
      where: { id: trackId },
      data: { fav: false },
    });
  }
}
