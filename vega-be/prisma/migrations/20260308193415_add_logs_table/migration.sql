-- CreateTable
CREATE TABLE "time_logs" (
    "id" TEXT NOT NULL,
    "estimate_time" TEXT,
    "logged_time" TEXT,
    "text" TEXT,
    "userUuid" TEXT NOT NULL,
    "taskUuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "time_logs" ADD CONSTRAINT "time_logs_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_logs" ADD CONSTRAINT "time_logs_taskUuid_fkey" FOREIGN KEY ("taskUuid") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
