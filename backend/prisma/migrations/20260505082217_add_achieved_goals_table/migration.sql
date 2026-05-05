-- CreateTable
CREATE TABLE "AchievedGoals" (
    "id" TEXT NOT NULL,
    "originalHabitId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pillar" TEXT NOT NULL,
    "finalCount" INTEGER NOT NULL,
    "targetDays" INTEGER NOT NULL,
    "avgIntensity" DOUBLE PRECISION NOT NULL,
    "avgFulfillment" DOUBLE PRECISION NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "achievedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AchievedGoals_pkey" PRIMARY KEY ("id")
);
