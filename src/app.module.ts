import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RsLoggerService } from './utils/services/logger.service';
import { FsService } from './utils/services/fs.service';
import { RsExceptionFilter } from './utils/middlewares/exception-filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    ConfigModule.forRoot(),
    JwtModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RsLoggerService,
    FsService,
    {
      provide: APP_FILTER,
      useClass: RsExceptionFilter,
    },
  ],
})
export class AppModule {}
