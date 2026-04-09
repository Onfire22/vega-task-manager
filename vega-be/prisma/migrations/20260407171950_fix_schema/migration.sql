/*
  Warnings:

  - You are about to drop the column `user_uuid` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `from_user_uuid` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to_user_uuid` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_user_uuid_fkey";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "user_uuid",
ADD COLUMN     "from_user_uuid" TEXT NOT NULL,
ADD COLUMN     "to_user_uuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_from_user_uuid_fkey" FOREIGN KEY ("from_user_uuid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_to_user_uuid_fkey" FOREIGN KEY ("to_user_uuid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
