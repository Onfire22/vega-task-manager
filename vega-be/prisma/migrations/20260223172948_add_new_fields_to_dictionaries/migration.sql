/*
  Warnings:

  - A unique constraint covering the columns `[color]` on the table `task_priorities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[color]` on the table `task_statuses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "task_priorities" ADD COLUMN     "color" TEXT;

-- AlterTable
ALTER TABLE "task_statuses" ADD COLUMN     "color" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "task_priorities_color_key" ON "task_priorities"("color");

-- CreateIndex
CREATE UNIQUE INDEX "task_statuses_color_key" ON "task_statuses"("color");
