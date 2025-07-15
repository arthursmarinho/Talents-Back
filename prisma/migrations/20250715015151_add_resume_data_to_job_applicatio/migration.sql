/*
  Warnings:

  - Changed the type of `candidateId` on the `JobApplication` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "candidateId",
ADD COLUMN     "candidateId" INTEGER NOT NULL;
