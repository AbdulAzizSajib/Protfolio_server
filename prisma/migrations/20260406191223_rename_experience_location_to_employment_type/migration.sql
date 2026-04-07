/*
  Warnings:

  - You are about to drop the column `location` on the `experiences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "experiences" DROP COLUMN "location",
ADD COLUMN     "employmentType" TEXT;
