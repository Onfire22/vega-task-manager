/*
  Warnings:

  - The values [STACK_TYPE] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('TASK_PRIORITY', 'ROLE_TYPE', 'USER_SECIALISATION', 'TASK_STATUS', 'TASK_TYPE', 'PROJECT_STATUS', 'PROJECT_TYPE');
ALTER TABLE "dictionaries" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "public"."Type_old";
COMMIT;
