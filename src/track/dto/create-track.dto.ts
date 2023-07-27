import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUUID()
  artistId: string | null;

  @IsString()
  @IsUUID()
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
