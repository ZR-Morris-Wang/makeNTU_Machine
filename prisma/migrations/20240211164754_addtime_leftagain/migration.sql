/*
  Warnings:

  - Added the required column `timeleft` to the `ThreeDPReq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ThreeDPReq" ADD COLUMN     "timeleft" INTEGER NOT NULL;
