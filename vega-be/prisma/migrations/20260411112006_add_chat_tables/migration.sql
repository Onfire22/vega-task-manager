-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('PM', 'CHANNEL');

-- CreateEnum
CREATE TYPE "ChannelVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterEnum
ALTER TYPE "Type" ADD VALUE 'CHAT_ROLE';

-- CreateTable
CREATE TABLE "chat_memberships" (
    "id" TEXT NOT NULL,
    "user_role_uuid" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,
    "channel_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_channels" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "channel_type" "ChannelType" NOT NULL,
    "channel_visibility" "ChannelVisibility" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isPinned" BOOLEAN NOT NULL,
    "channelUuid" TEXT NOT NULL,
    "authorUuid" TEXT NOT NULL,
    "replyToUuid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chat_channels_title_key" ON "chat_channels"("title");

-- AddForeignKey
ALTER TABLE "chat_memberships" ADD CONSTRAINT "chat_memberships_user_role_uuid_fkey" FOREIGN KEY ("user_role_uuid") REFERENCES "dictionaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_memberships" ADD CONSTRAINT "chat_memberships_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_memberships" ADD CONSTRAINT "chat_memberships_channel_uuid_fkey" FOREIGN KEY ("channel_uuid") REFERENCES "chat_channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_channelUuid_fkey" FOREIGN KEY ("channelUuid") REFERENCES "chat_channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_authorUuid_fkey" FOREIGN KEY ("authorUuid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_replyToUuid_fkey" FOREIGN KEY ("replyToUuid") REFERENCES "chat_messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
