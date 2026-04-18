-- CreateTable
CREATE TABLE "TaskItem" (
    "id" TEXT NOT NULL,
    "taskItem" TEXT NOT NULL,
    "pillar" TEXT NOT NULL,
    "intensity" INTEGER NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,
    "interval" TEXT NOT NULL,
    "duration" INTEGER,
    "targetDays" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskCompletion" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskCompletion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskCompletion" ADD CONSTRAINT "TaskCompletion_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TaskItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
