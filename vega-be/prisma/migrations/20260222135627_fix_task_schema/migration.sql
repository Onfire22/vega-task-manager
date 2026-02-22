/*
  Warnings:

  - You are about to drop the column `satck_uuid` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `sratus_uuid` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `stack_uuid` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_uuid` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_assignee_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_project_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_satck_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_sratus_uuid_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "satck_uuid",
DROP COLUMN "sratus_uuid",
ADD COLUMN     "stack_uuid" TEXT NOT NULL,
ADD COLUMN     "status_uuid" TEXT NOT NULL,
ALTER COLUMN "estimate_time" DROP NOT NULL,
ALTER COLUMN "logged_time" DROP NOT NULL,
ALTER COLUMN "assignee_uuid" DROP NOT NULL,
ALTER COLUMN "project_uuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignee_uuid_fkey" FOREIGN KEY ("assignee_uuid") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_uuid_fkey" FOREIGN KEY ("project_uuid") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_status_uuid_fkey" FOREIGN KEY ("status_uuid") REFERENCES "task_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_stack_uuid_fkey" FOREIGN KEY ("stack_uuid") REFERENCES "Stack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
