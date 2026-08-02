/*
  Warnings:

  - You are about to drop the column `user_specialisation_uuid` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_user_specialisation_uuid_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_specialisation_uuid",
ADD COLUMN     "dictionaryUuid" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_dictionaryUuid_fkey" FOREIGN KEY ("dictionaryUuid") REFERENCES "dictionaries"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
