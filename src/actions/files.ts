import ImageUpload from "@/components/uploadfile";
import { minioClient } from "@/lib/mino";
import { prisma } from "@/lib/prisma";

export async function getFileWithUrl(fileId:string){

    const fileRecord = await prisma.fileUpload.findUnique({
        where: {
            id:fileId
        }
    })

    if(!fileRecord) throw new Error ('File not found');

    const expirySeconds = 3600;

    const url = await minioClient.presignedGetObject(
        fileRecord.bucket,
        fileRecord.fileName,
        expirySeconds
    )

    return {
        ...ImageUpload,
        downloadurl:url,
    }
}