/*
  Warnings:

  - Added the required column `satck_uuid` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "satck_uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "stackUuid" TEXT;

-- CreateTable
CREATE TABLE "Stack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stack_name_key" ON "Stack"("name");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_satck_uuid_fkey" FOREIGN KEY ("satck_uuid") REFERENCES "Stack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_stackUuid_fkey" FOREIGN KEY ("stackUuid") REFERENCES "Stack"("id") ON DELETE SET NULL ON UPDATE CASCADE;
