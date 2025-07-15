/*
  Warnings:

  - You are about to drop the column `resume` on the `JobApplication` table. All the data in the column will be lost.
  - Added the required column `resumeData` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "resume",
ADD COLUMN     "resumeData" BYTEA NOT NULL;
