-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "is_readed" BOOLEAN NOT NULL DEFAULT false,
    "task_uuid" TEXT,
    "memberships_uuid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_task_uuid_fkey" FOREIGN KEY ("task_uuid") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_memberships_uuid_fkey" FOREIGN KEY ("memberships_uuid") REFERENCES "memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;
