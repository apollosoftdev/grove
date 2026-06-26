import ImageUpload from "@/components/uploadfile";
import { minioClient } from "@/lib/mino";
import { prisma } from "@/lib/prisma";

export async function getFileWithUrl(fileId:string){

    const fileRecord = await prisma.imageUpload.findUnique({
        where: {
            id:fileId
        }
    })

    if(!fileRecord) throw new Error ('File not found');

    const expirySeconds = 3600;

    const url = await minioClient.presignedGetObject(
        ImageUpload.bucket,
        ImageUpload.fileName,
        expirySeconds
    )

    return {
        ...ImageUpload,
        downloadurl:url,
    }
}