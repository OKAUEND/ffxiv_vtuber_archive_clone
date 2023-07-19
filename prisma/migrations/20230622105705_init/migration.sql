-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "channelID" VARCHAR(26) NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "channelName" VARCHAR(20) NOT NULL,
    "channelIconURL" VARCHAR(110) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_channelID_key" ON "Channel"("channelID");
