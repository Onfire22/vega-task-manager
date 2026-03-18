/*
  Warnings:

  - A unique constraint covering the columns `[key,type]` on the table `dictionaries` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "dictionaries_label_type_key";

-- CreateIndex
CREATE UNIQUE INDEX "dictionaries_key_type_key" ON "dictionaries"("key", "type");
