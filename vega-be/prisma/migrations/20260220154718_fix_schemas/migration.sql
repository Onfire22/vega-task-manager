/*
  Warnings:

  - You are about to drop the `Projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `priority` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userUuid]` on the table `memberships` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_prject_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_priority_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_project_uuid_fkey";

-- DropTable
DROP TABLE "Projects";

-- DropTable
DROP TABLE "priority";

-- CreateTable
CREATE TABLE "task_priorities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "task_priorities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_priorities_name_key" ON "task_priorities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "memberships_userUuid_key" ON "memberships"("userUuid");

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_prject_uuid_fkey" FOREIGN KEY ("prject_uuid") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_uuid_fkey" FOREIGN KEY ("project_uuid") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_priority_uuid_fkey" FOREIGN KEY ("priority_uuid") REFERENCES "task_priorities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
