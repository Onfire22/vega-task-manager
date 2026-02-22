/*
  Warnings:

  - A unique constraint covering the columns `[full_name]` on the table `stacks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[color]` on the table `stacks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `color` to the `stacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `stacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stacks" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "stacks_full_name_key" ON "stacks"("full_name");

-- CreateIndex
CREATE UNIQUE INDEX "stacks_color_key" ON "stacks"("color");
