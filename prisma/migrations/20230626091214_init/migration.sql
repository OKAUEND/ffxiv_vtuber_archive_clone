/*
  Warnings:

  - The `beginTime` column on the `Channel` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "beginTime",
ADD COLUMN     "beginTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
