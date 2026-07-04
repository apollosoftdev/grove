import {  NextResponse, NextRequest } from "next/server";
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
    accessKey: "minioadmin",
    secretKey: "minioadmin",
})

export async function POST(request: Request, {params}: { params: Promise<{ id: string }> }){

    try{
        const resolvedParams = await params;
        const id = resolvedParams.id;

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
                originalName: fileName,
                filetoproduct: {
                create: {
                    productId:  id
                      }
                  }
            }});

        return NextResponse.json({ uploadUrl: presignedUrl, file: savedFile }, { status: 201 });
    } catch (error) {
        console.error("Error uploading file:", error);
        const details = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: "Failed to upload file", details }, { status: 500 });
    }
}

export async function GET(
  req: NextRequest,
   {params}: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
    console.log(id);
  try {
    // 1. Fetch file record from Prisma using the file ID
    const fileRecord = await prisma.product.findFirst({
        where: { id: id },
        include: {
          image: {         // Include the FileToProduct relation
            include: {
              file: {      // Include the actual File relation
                select: {
                  bucket: true, // Select only the bucket field
                  fileName:true,
                }
              }
            }
          }
       } 
    });
    
    if (!fileRecord) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // 2. Generate a pre-signed URL (expires in 1 hour / 3600 seconds)
    const url = await minioClient.presignedGetObject(
      process.env.MINIO_BUCKET_NAME as string,
      fileRecord.image[0].file.fileName, 
      3600
    );
  console.log(url);
    // 3. Return the secure URL to the frontend
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json({ error: 'Error generating URL' }, { status: 500 });
  }
}
