/*
  Warnings:

  - You are about to drop the `PlayStyles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PlayStyles";

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Tagging_channel_id_tag_id_idx" ON "Tagging"("channel_id", "tag_id");
