/*
  Warnings:

  - A unique constraint covering the columns `[name,type]` on the table `dictionaries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "dictionaries_name_type_key" ON "dictionaries"("name", "type");
