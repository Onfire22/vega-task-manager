/*
  Warnings:

  - Added the required column `entity_type` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "entity_type" TEXT NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL;
