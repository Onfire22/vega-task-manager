-- CreateEnum
CREATE TYPE "Type" AS ENUM ('TASK_PRIORITY', 'ROLE_TYPE', 'STACK_TYPE', 'TASK_STATUS');

-- CreateTable
CREATE TABLE "Dictionaries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "type" "Type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dictionaries_pkey" PRIMARY KEY ("id")
);
