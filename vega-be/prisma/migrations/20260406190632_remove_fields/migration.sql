/*
  Warnings:

  - You are about to drop the column `action` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `actionType` on the `notifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "action",
DROP COLUMN "actionType";
