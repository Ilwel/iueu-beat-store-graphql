/*
  Warnings:

  - You are about to drop the column `cartId` on the `musics` table. All the data in the column will be lost.
  - Added the required column `cover` to the `musics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "musics" DROP CONSTRAINT "musics_cartId_fkey";

-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "musics" DROP COLUMN "cartId",
ADD COLUMN     "cover" TEXT NOT NULL,
ALTER COLUMN "raw" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "spotifyLink" TEXT,
ADD COLUMN     "youtubeLink" TEXT;

-- CreateTable
CREATE TABLE "_MusicToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CartToMusic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MusicToUser_AB_unique" ON "_MusicToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicToUser_B_index" ON "_MusicToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CartToMusic_AB_unique" ON "_CartToMusic"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToMusic_B_index" ON "_CartToMusic"("B");

-- AddForeignKey
ALTER TABLE "_MusicToUser" ADD CONSTRAINT "_MusicToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "musics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicToUser" ADD CONSTRAINT "_MusicToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToMusic" ADD CONSTRAINT "_CartToMusic_A_fkey" FOREIGN KEY ("A") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToMusic" ADD CONSTRAINT "_CartToMusic_B_fkey" FOREIGN KEY ("B") REFERENCES "musics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
