import {  NextResponse } from "next/server";
import * as Minio from "minio";
import { prisma } from "@/lib/prisma";

const useSSL = process.env.MINIO_USE_SSL === "true";

const minioClient = new Minio.Client({
    // endPoint: process.env.MINIO_ENDPOINT || "localhost",
    // port: parseInt(process.env.MINIO_PORT || "9000"),
    // // useSSL:useSSL,
    // useSSL: false,
    // accessKey: process.env.MINIO_ACCESS_KEY || "",
    // secretKey: process.env.MINIO_SECRET_KEY || "",
    endPoint: "127.0.0.1",
    port: 9000,
    useSSL: false,
    accessKey: "myadminuser",
    secretKey: "mystrongpassword123",
})

export async function POST(request: Request){

    try{
        const { fileName, contentType } = await request.json();

        if (!fileName || !contentType) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const bucketName = process.env.MINIO_BUCKET_NAME || "images";

        const bucketExits = await minioClient.bucketExists(bucketName);

        if(!bucketExits){
            await minioClient.makeBucket(bucketName, "us-east-1");
        }

        const presignedUrl = await minioClient.presignedPutObject(bucketName, fileName, 900);

        // const imageUrl = `http://${endPoint}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`;
        
        const endpoint = process.env.MINIO_ENDPOINT || "127.0.0.1";
        const port = process.env.MINIO_PORT || "9000";
        const imageUrl = `http://${endpoint}:${port}/${bucketName}/${fileName}`;
    

        const savedFile = await prisma.file.create({
            data: {
                bucket: imageUrl,
                fileName:  fileName, 
                mimeType:  contentType,
                originalName: fileName
            }});

        return NextResponse.json({ uploadUrl: presignedUrl, file: savedFile }, { status: 201 });
    } catch (error) {
        console.error("Error uploading file:", error);
        const details = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: "Failed to upload file", details }, { status: 500 });
    }
}

   