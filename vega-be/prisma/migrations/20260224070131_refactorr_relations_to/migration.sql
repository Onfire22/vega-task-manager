/*
  Warnings:

  - You are about to drop the column `yser_stack_uuid` on the `users` table. All the data in the column will be lost.
  - Made the column `task_priority_uuid` on table `tasks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `task_stack_uuid` on table `tasks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `task_status_uuid` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_task_priority_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_task_stack_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_task_status_uuid_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_yser_stack_uuid_fkey";

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "task_priority_uuid" SET NOT NULL,
ALTER COLUMN "task_stack_uuid" SET NOT NULL,
ALTER COLUMN "task_status_uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "yser_stack_uuid",
ADD COLUMN     "user_stack_uuid" TEXT;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_priority_uuid_fkey" FOREIGN KEY ("task_priority_uuid") REFERENCES "dictionaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_status_uuid_fkey" FOREIGN KEY ("task_status_uuid") REFERENCES "dictionaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_stack_uuid_fkey" FOREIGN KEY ("task_stack_uuid") REFERENCES "dictionaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_stack_uuid_fkey" FOREIGN KEY ("user_stack_uuid") REFERENCES "dictionaries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
