-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "goalId" TEXT;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
