-- AlterTable
ALTER TABLE "page_views" ADD COLUMN     "eventType" TEXT NOT NULL DEFAULT 'page_view',
ADD COLUMN     "section" TEXT;
