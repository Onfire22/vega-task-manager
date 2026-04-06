/*
  Warnings:

  - You are about to drop the column `user_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `user_uuid` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "user_id",
DROP COLUMN "user_name",
ADD COLUMN     "user_uuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
