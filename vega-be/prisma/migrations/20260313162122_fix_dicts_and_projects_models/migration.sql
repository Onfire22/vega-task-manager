/*
  Warnings:

  - You are about to drop the column `color` on the `dictionaries` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `dictionaries` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `dictionaries` table. All the data in the column will be lost.
  - You are about to drop the column `user_stack_uuid` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[label,type]` on the table `dictionaries` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `dictionaries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_status_uuid` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_specialisation_uuid` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `second_name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Type" ADD VALUE 'TASK_TYPE';
ALTER TYPE "Type" ADD VALUE 'PROJECT_STATUS';

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_user_stack_uuid_fkey";

-- DropIndex
DROP INDEX "dictionaries_name_type_key";

-- AlterTable
ALTER TABLE "dictionaries" DROP COLUMN "color",
DROP COLUMN "full_name",
DROP COLUMN "name",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "label" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "project_status_uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_stack_uuid",
ADD COLUMN     "user_specialisation_uuid" TEXT NOT NULL,
ALTER COLUMN "second_name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "dictionaries_label_type_key" ON "dictionaries"("label", "type");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_project_status_uuid_fkey" FOREIGN KEY ("project_status_uuid") REFERENCES "dictionaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_specialisation_uuid_fkey" FOREIGN KEY ("user_specialisation_uuid") REFERENCES "dictionaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
