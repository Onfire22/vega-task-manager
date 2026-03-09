/*
  Warnings:

  - You are about to drop the column `remainig_time` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "remainig_time",
ADD COLUMN     "remaining_time" INTEGER;
