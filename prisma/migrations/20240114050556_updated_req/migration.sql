/*
  Warnings:

  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Request";

-- CreateTable
CREATE TABLE "LaserCutReq" (
    "id" SERIAL NOT NULL,
    "groupname" TEXT NOT NULL,
    "machine" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "material" INTEGER[],
    "comment" TEXT,
    "status" TEXT NOT NULL DEFAULT '已送出請求',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LaserCutReq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThreeDPReq" (
    "id" SERIAL NOT NULL,
    "groupname" TEXT NOT NULL,
    "machine" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "loadBearing" BOOLEAN NOT NULL DEFAULT false,
    "material" INTEGER[],
    "comment" TEXT,
    "status" TEXT NOT NULL DEFAULT '已送出請求',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ThreeDPReq_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LaserCutReq" ADD CONSTRAINT "LaserCutReq_groupname_fkey" FOREIGN KEY ("groupname") REFERENCES "Account"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreeDPReq" ADD CONSTRAINT "ThreeDPReq_groupname_fkey" FOREIGN KEY ("groupname") REFERENCES "Account"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
