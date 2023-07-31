import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favs } from 'src/favs/entities/favs.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

export const userCollection: User[] = [];
export const trackCollection: Track[] = [];
export const artistCollection: Artist[] = [];
export const albumCollection: Album[] = [];
export const favsCollection: Favs = new Favs();
