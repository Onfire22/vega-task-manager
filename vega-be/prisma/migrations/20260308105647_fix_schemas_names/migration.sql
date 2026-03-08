/*
  Warnings:

  - Made the column `user_stack_uuid` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_user_stack_uuid_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "user_stack_uuid" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_stack_uuid_fkey" FOREIGN KEY ("user_stack_uuid") REFERENCES "dictionaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
