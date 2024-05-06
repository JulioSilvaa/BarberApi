/*
  Warnings:

  - You are about to drop the column `service_description` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `service_name` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `service_price` on the `Service` table. All the data in the column will be lost.
  - Added the required column `description` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "service_description",
DROP COLUMN "service_name",
DROP COLUMN "service_price",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL;
