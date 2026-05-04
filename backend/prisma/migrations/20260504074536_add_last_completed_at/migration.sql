/*
  Warnings:

  - Added the required column `intensity` to the `TaskCompletion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pillar` to the `TaskCompletion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskCompletion" ADD COLUMN     "intensity" INTEGER NOT NULL,
ADD COLUMN     "pillar" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TaskItem" ADD COLUMN     "lastCompletedAt" TIMESTAMP(3),
ALTER COLUMN "intensity" DROP NOT NULL;
