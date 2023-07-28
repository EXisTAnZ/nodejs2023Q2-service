import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  @Max(2023)
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}
