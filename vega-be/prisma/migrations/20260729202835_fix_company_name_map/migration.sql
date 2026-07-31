/*
  Warnings:

  - You are about to drop the column `companyTitle` on the `companies` table. All the data in the column will be lost.
  - Added the required column `company_title` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "companyTitle",
ADD COLUMN     "company_title" TEXT NOT NULL;
