/*
  Warnings:

  - A unique constraint covering the columns `[userUuid,prject_uuid]` on the table `memberships` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "memberships_userUuid_key";

-- CreateIndex
CREATE UNIQUE INDEX "memberships_userUuid_prject_uuid_key" ON "memberships"("userUuid", "prject_uuid");
