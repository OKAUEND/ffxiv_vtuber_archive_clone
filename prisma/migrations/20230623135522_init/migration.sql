/*
  Warnings:

  - Added the required column `dataCenter` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "dataCenter" TEXT NOT NULL,
ALTER COLUMN "channelID" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "channelName" SET DATA TYPE TEXT,
ALTER COLUMN "channelIconURL" SET DATA TYPE TEXT;
