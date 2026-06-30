import {  NextResponse } from "next/server";
import * as Minio from "minio";
import { prisma } from "@/lib/prisma";
const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || "localhost",
    port: parseInt(process.env.MINIO_PORT || "9000"),
    useSSL:true,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
})

export async function POST(request: Request){
    try{
        const { fileName, contentType } = await request.json();
        const bucketName = process.env.MINIO_BUCKET_NAME || "images";

        const bucketExits = await minioClient.bucketExists(bucketName);
        if(!bucketExits){
            await minioClient.makeBucket(bucketName, "us-east-1");
        }

        const url = await minioClient.presignedPutObject(bucketName, fileName, 900);

        const iamgeUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`;
        
        await prisma.file.create({
            data: {
                bucket: iamgeUrl,
                fileName: "some-product-id", 
                mimeType: "MimeType",
                originalName: "product-id" 
            }});
        
        return NextResponse.json({  }, { status: 201});
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}

