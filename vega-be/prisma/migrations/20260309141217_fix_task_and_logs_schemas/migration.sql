/*
  Warnings:

  - You are about to drop the column `logged_time` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `estimate_time` on the `time_logs` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `time_logs` table. All the data in the column will be lost.
  - Made the column `logged_time` on table `time_logs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "logged_time",
ADD COLUMN     "remainig_time" INTEGER;

-- AlterTable
ALTER TABLE "time_logs" DROP COLUMN "estimate_time",
DROP COLUMN "text",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "logged_time" SET NOT NULL;
