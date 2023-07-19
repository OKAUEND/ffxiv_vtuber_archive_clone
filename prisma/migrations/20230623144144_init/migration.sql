/*
  Warnings:

  - Added the required column `Twitch` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Twitter` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `server` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "Twitch" TEXT NOT NULL,
ADD COLUMN     "Twitter" TEXT NOT NULL,
ADD COLUMN     "server" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
