-- CreateTable
CREATE TABLE "about" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL DEFAULT 'main',
    "title" TEXT,
    "subtitle" TEXT,
    "description" TEXT,
    "yearsOfExperience" INTEGER,
    "projectsCompleted" INTEGER,
    "clientsWorkedWith" INTEGER,
    "imageUrl" TEXT,
    "resumeUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "about_key_key" ON "about"("key");
