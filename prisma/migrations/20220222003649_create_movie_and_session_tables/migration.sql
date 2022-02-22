/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SessionRoom" AS ENUM ('COMMON', 'IMAX', 'XD', 'DELUXE');

-- CreateEnum
CREATE TYPE "Classification" AS ENUM ('GENERAL_AUDIENCE', 'PARENT_GUIDANCE_SUGGESTED', 'PARENTS_STRONGLY_CAUTIONED', 'RESTRICTED', 'ADULTS_ONLY');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "classification" "Classification" NOT NULL DEFAULT E'GENERAL_AUDIENCE',
    "duration" INTEGER NOT NULL,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "sessionDate" TIMESTAMP(3) NOT NULL,
    "room" "SessionRoom" NOT NULL DEFAULT E'COMMON',
    "movieId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "reviewer" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
