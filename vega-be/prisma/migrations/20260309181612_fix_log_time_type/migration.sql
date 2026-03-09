/*
  Warnings:

  - You are about to drop the column `taskUuid` on the `time_logs` table. All the data in the column will be lost.
  - You are about to drop the column `userUuid` on the `time_logs` table. All the data in the column will be lost.
  - Added the required column `task_uuid` to the `time_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_uuid` to the `time_logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "time_logs" DROP CONSTRAINT "time_logs_taskUuid_fkey";

-- DropForeignKey
ALTER TABLE "time_logs" DROP CONSTRAINT "time_logs_userUuid_fkey";

-- AlterTable
ALTER TABLE "time_logs" DROP COLUMN "taskUuid",
DROP COLUMN "userUuid",
ADD COLUMN     "task_uuid" TEXT NOT NULL,
ADD COLUMN     "user_uuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "time_logs" ADD CONSTRAINT "time_logs_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_logs" ADD CONSTRAINT "time_logs_task_uuid_fkey" FOREIGN KEY ("task_uuid") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
