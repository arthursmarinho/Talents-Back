/*
  Warnings:

  - A unique constraint covering the columns `[jobId,candidateId]` on the table `JobApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_jobId_candidateId_key" ON "JobApplication"("jobId", "candidateId");
