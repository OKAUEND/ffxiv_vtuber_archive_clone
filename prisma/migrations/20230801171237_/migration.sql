/*
  Warnings:

  - The primary key for the `Tagging` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tagging` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tagging" DROP CONSTRAINT "Tagging_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Tagging_pkey" PRIMARY KEY ("channel_id", "tag_id");

-- AddForeignKey
ALTER TABLE "Tagging" ADD CONSTRAINT "Tagging_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tagging" ADD CONSTRAINT "Tagging_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
