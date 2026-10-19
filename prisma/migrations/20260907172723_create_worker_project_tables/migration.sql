-- CreateTable
CREATE TABLE "Worker" (
    "id" TEXT NOT NULL,
    "workerCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pinHash" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectCode" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerMobile" TEXT NOT NULL,
    "fullAddress" TEXT,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT,
    "projectType" TEXT NOT NULL,
    "capacityKw" DOUBLE PRECISION NOT NULL,
    "panelBrand" TEXT,
    "inverterBrand" TEXT,
    "installationDate" TIMESTAMP(3),
    "completionDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'Completed',
    "description" TEXT,
    "publicImageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Worker_workerCode_key" ON "Worker"("workerCode");

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectCode_key" ON "Project"("projectCode");

-- CreateIndex
CREATE INDEX "Project_city_idx" ON "Project"("city");

-- CreateIndex
CREATE INDEX "Project_district_idx" ON "Project"("district");

-- CreateIndex
CREATE INDEX "Project_isPublic_createdAt_idx" ON "Project"("isPublic", "createdAt");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
