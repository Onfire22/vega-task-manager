/*
  Warnings:

  - Made the column `logged_time` on table `time_logs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "time_logs" ALTER COLUMN "logged_time" SET NOT NULL;
