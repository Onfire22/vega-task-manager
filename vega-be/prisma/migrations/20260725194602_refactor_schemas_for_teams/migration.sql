-- DropForeignKey
ALTER TABLE "chat_memberships" DROP CONSTRAINT "chat_memberships_channel_uuid_fkey";

-- DropForeignKey
ALTER TABLE "chat_memberships" DROP CONSTRAINT "chat_memberships_userUuid_fkey";

-- DropForeignKey
ALTER TABLE "chat_memberships" DROP CONSTRAINT "chat_memberships_user_role_uuid_fkey";

-- DropForeignKey
ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_authorUuid_fkey";

-- DropForeignKey
ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_channelUuid_fkey";

-- DropForeignKey
ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_replyToUuid_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_author_uuid_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_task_uuid_fkey";

-- DropForeignKey
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_prject_uuid_fkey";

-- DropForeignKey
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_userUuid_fkey";

-- DropForeignKey
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_user_role_uuid_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_from_user_uuid_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_memberships_uuid_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_task_uuid_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_to_user_uuid_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_project_status_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_assignee_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_project_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_reporter_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_task_priority_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_task_stack_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_task_status_uuid_fkey";

-- DropForeignKey
ALTER TABLE "time_logs" DROP CONSTRAINT "time_logs_task_uuid_fkey";

-- DropForeignKey
ALTER TABLE "time_logs" DROP CONSTRAINT "time_logs_user_uuid_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_user_specialisation_uuid_fkey";

-- AlterTable
ALTER TABLE "chat_channels" DROP CONSTRAINT "chat_channels_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "chat_channels_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "chat_memberships" DROP CONSTRAINT "chat_memberships_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "chat_memberships_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "comments" DROP CONSTRAINT "comments_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "dictionaries" DROP CONSTRAINT "dictionaries_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "dictionaries_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "memberships_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "projects" DROP CONSTRAINT "projects_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "time_logs" DROP CONSTRAINT "time_logs_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "time_logs_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "is_super_user" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("uuid");

-- CreateTable
CREATE TABLE "companies" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "projects_memberships" (
    "uuid" TEXT NOT NULL,
    "teamUuid" TEXT NOT NULL,
    "prject_uuid" TEXT NOT NULL,
    "owner_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_memberships_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "teams" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "team_members" (
    "uuid" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,
    "teamUuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_memberships_teamUuid_prject_uuid_key" ON "projects_memberships"("teamUuid", "prject_uuid");

-- AddForeignKey
ALTER TABLE "chat_memberships" ADD CONSTRAINT "chat_memberships_user_role_uuid_fkey" FOREIGN KEY ("user_role_uuid") REFERENCES "dictionaries"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_memberships" ADD CONSTRAINT "chat_memberships_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_memberships" ADD CONSTRAINT "chat_memberships_channel_uuid_fkey" FOREIGN KEY ("channel_uuid") REFERENCES "chat_channels"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_channelUuid_fkey" FOREIGN KEY ("channelUuid") REFERENCES "chat_channels"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_authorUuid_fkey" FOREIGN KEY ("authorUuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_replyToUuid_fkey" FOREIGN KEY ("replyToUuid") REFERENCES "chat_messages"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_task_uuid_fkey" FOREIGN KEY ("task_uuid") REFERENCES "tasks"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_uuid_fkey" FOREIGN KEY ("author_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_prject_uuid_fkey" FOREIGN KEY ("prject_uuid") REFERENCES "projects"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_role_uuid_fkey" FOREIGN KEY ("user_role_uuid") REFERENCES "dictionaries"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_from_user_uuid_fkey" FOREIGN KEY ("from_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_to_user_uuid_fkey" FOREIGN KEY ("to_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_task_uuid_fkey" FOREIGN KEY ("task_uuid") REFERENCES "tasks"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_memberships_uuid_fkey" FOREIGN KEY ("memberships_uuid") REFERENCES "memberships"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_project_status_uuid_fkey" FOREIGN KEY ("project_status_uuid") REFERENCES "dictionaries"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects_memberships" ADD CONSTRAINT "projects_memberships_teamUuid_fkey" FOREIGN KEY ("teamUuid") REFERENCES "teams"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects_memberships" ADD CONSTRAINT "projects_memberships_prject_uuid_fkey" FOREIGN KEY ("prject_uuid") REFERENCES "projects"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects_memberships" ADD CONSTRAINT "projects_memberships_owner_uuid_fkey" FOREIGN KEY ("owner_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignee_uuid_fkey" FOREIGN KEY ("assignee_uuid") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_reporter_uuid_fkey" FOREIGN KEY ("reporter_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_uuid_fkey" FOREIGN KEY ("project_uuid") REFERENCES "projects"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_priority_uuid_fkey" FOREIGN KEY ("task_priority_uuid") REFERENCES "dictionaries"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_status_uuid_fkey" FOREIGN KEY ("task_status_uuid") REFERENCES "dictionaries"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_stack_uuid_fkey" FOREIGN KEY ("task_stack_uuid") REFERENCES "dictionaries"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_teamUuid_fkey" FOREIGN KEY ("teamUuid") REFERENCES "teams"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_logs" ADD CONSTRAINT "time_logs_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_logs" ADD CONSTRAINT "time_logs_task_uuid_fkey" FOREIGN KEY ("task_uuid") REFERENCES "tasks"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_specialisation_uuid_fkey" FOREIGN KEY ("user_specialisation_uuid") REFERENCES "dictionaries"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
