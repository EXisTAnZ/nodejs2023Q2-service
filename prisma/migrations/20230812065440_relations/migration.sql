/*
  Warnings:

  - You are about to drop the column `albums` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `artists` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `tracks` on the `Favorites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "albums",
DROP COLUMN "artists",
DROP COLUMN "tracks";

-- CreateTable
CREATE TABLE "_ArtistToFavorites" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AlbumToFavorites" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoritesToTrack" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToFavorites_AB_unique" ON "_ArtistToFavorites"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToFavorites_B_index" ON "_ArtistToFavorites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToFavorites_AB_unique" ON "_AlbumToFavorites"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToFavorites_B_index" ON "_AlbumToFavorites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesToTrack_AB_unique" ON "_FavoritesToTrack"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesToTrack_B_index" ON "_FavoritesToTrack"("B");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToFavorites" ADD CONSTRAINT "_ArtistToFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToFavorites" ADD CONSTRAINT "_ArtistToFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToFavorites" ADD CONSTRAINT "_AlbumToFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToFavorites" ADD CONSTRAINT "_AlbumToFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToTrack" ADD CONSTRAINT "_FavoritesToTrack_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToTrack" ADD CONSTRAINT "_FavoritesToTrack_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
