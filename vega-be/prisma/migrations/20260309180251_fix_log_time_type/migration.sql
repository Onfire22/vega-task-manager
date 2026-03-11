/*
  Warnings:

  - Changed the type of `logged_time` on the `time_logs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "time_logs" DROP COLUMN "logged_time",
ADD COLUMN     "logged_time" INTEGER NOT NULL;
