/*
  Warnings:

  - You are about to drop the column `title` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `teams` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `teams` table. All the data in the column will be lost.
  - Added the required column `address` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyTitle` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inn` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Made the column `avatar_url` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `team_title` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "title",
ADD COLUMN     "accent_color" TEXT,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "companyTitle" TEXT NOT NULL,
ADD COLUMN     "inn" TEXT NOT NULL,
ADD COLUMN     "main_color" TEXT,
ALTER COLUMN "avatar_url" SET NOT NULL;

-- AlterTable
ALTER TABLE "teams" DROP COLUMN "avatar_url",
DROP COLUMN "title",
ADD COLUMN     "team_avatar" TEXT,
ADD COLUMN     "team_title" TEXT NOT NULL;
