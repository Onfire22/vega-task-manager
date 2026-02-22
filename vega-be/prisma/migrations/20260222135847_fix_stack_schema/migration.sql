/*
  Warnings:

  - You are about to drop the `Stack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_stack_uuid_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_stack_uuid_fkey";

-- DropTable
DROP TABLE "Stack";

-- CreateTable
CREATE TABLE "stacks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stacks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stacks_name_key" ON "stacks"("name");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_stack_uuid_fkey" FOREIGN KEY ("stack_uuid") REFERENCES "stacks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_stack_uuid_fkey" FOREIGN KEY ("stack_uuid") REFERENCES "stacks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
