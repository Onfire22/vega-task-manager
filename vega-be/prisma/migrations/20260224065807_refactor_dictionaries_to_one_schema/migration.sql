/*
  Warnings:

  - You are about to drop the column `role_uuid` on the `memberships` table. All the data in the column will be lost.
  - You are about to drop the column `priority_uuid` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `stack_uuid` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `status_uuid` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `stack_uuid` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stacks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task_priorities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task_statuses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_role_uuid` to the `memberships` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_role_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_priority_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_stack_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_status_uuid_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_stack_uuid_fkey";

-- AlterTable
ALTER TABLE "memberships" DROP COLUMN "role_uuid",
ADD COLUMN     "user_role_uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "priority_uuid",
DROP COLUMN "stack_uuid",
DROP COLUMN "status_uuid",
ADD COLUMN     "task_priority_uuid" TEXT,
ADD COLUMN     "task_stack_uuid" TEXT,
ADD COLUMN     "task_status_uuid" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "stack_uuid",
ADD COLUMN     "yser_stack_uuid" TEXT;

-- DropTable
DROP TABLE "roles";

-- DropTable
DROP TABLE "stacks";

-- DropTable
DROP TABLE "task_priorities";

-- DropTable
DROP TABLE "task_statuses";

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_role_uuid_fkey" FOREIGN KEY ("user_role_uuid") REFERENCES "dictionaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_priority_uuid_fkey" FOREIGN KEY ("task_priority_uuid") REFERENCES "dictionaries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_status_uuid_fkey" FOREIGN KEY ("task_status_uuid") REFERENCES "dictionaries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_stack_uuid_fkey" FOREIGN KEY ("task_stack_uuid") REFERENCES "dictionaries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_yser_stack_uuid_fkey" FOREIGN KEY ("yser_stack_uuid") REFERENCES "dictionaries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
