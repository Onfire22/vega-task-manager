/*
  Warnings:

  - You are about to drop the column `stackUuid` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_stackUuid_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "stackUuid",
ADD COLUMN     "stack_uuid" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_stack_uuid_fkey" FOREIGN KEY ("stack_uuid") REFERENCES "Stack"("id") ON DELETE SET NULL ON UPDATE CASCADE;
