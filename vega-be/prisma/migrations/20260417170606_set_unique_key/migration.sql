/*
  Warnings:

  - A unique constraint covering the columns `[userUuid,channel_uuid]` on the table `chat_memberships` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chat_memberships_userUuid_channel_uuid_key" ON "chat_memberships"("userUuid", "channel_uuid");
