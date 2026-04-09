/*
  Warnings:

  - You are about to drop the column `entity_type` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `entityType` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('TASK', 'PROJECT');

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "entity_type",
ADD COLUMN     "entityType" "EntityType" NOT NULL;
