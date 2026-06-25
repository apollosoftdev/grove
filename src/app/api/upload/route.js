import { NextResponse } from "next/server";
import * as Minio from "minio";
import { PrismaClient } from "@/lib/prisma";

const prisma = new PrismaClient();

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || "localhost",
    port: parseInt(process.env.MINIO_PORT || "9000"),
    useSSL:false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
})

export async function POST(request){
    try{
        const { fileName, contentType } = await request.json();
        const bucketName = process.env.MINIO_BUCKET_NAME || "imagess";

        const bucketExits = await minioClient.bucketExists(bucketName);
        if(!bucketExits){
            await minioClient.makeBucket(bucketName, "us-east-1");
        }

        const url = await minioClient.presignedPutObject(bucketName, fileName, 900);

        const iamgeUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`;
        
        await prisma.imageUpload.create({
            data: {
                url: iamgeUrl,
                productId: "some-product-id" 
            }});
        
        return NextResponse.json({ uploadUrl: url, dbRecord: newImage });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}