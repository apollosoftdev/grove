"use client";

import { useState } from "react";
import { useEffect } from "react";

export default function ImageUpload({ fileId }: { fileId: string }){

    const [ file, setFile ] = useState<File | null>(null);
    const [ uploading, setUploading ] = useState(false);
    const [ imageUrl, setImageUrl ] = useState<string | null>(null);
    
    useEffect(() => {
        console.log("Current imageUrl state:", imageUrl);
    }, [imageUrl]);

    const handleUpload = async () => {
        if(!file) return;
        setUploading(true);
        try{
            const res = await fetch(`/api/upload/${fileId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ fileName: file.name, contentType: file.type }),
            });

            if (!res.ok) 
                {   
                    throw new Error("Failed to get upload URL");
                }
            const { uploadUrl, file: dbFile } = await res.json();

            const uploadRes = await fetch(uploadUrl, {
                method: "PUT",
                body: file,
                headers: { 'Content-Type': file.type }
            });

            if(uploadRes.ok){
                // const minioEndpoint = "http://localhost:9000";
                // const completeUrl = `${minioEndpoint}/${dbFile.bucket}/${dbFile.fileName}`;
                
                // setImageUrl( completeUrl );
                setImageUrl(dbFile.bucket); 
                alert("Upload successful!");
            }
        }
        catch(error){
            console.error(error);
        }
        finally {
            setUploading(false);
        }
    }
   
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    useEffect(() =>{
        async function handleFetchFile(){
            try{
                const res = await fetch(`/api/upload/${fileId}`);
                const data = await res.json();
                if (data.url) {
                    setFileUrl(data.url);
                }
            }
            catch(error)
            {
                console.log("error occured.")
            }

        };
        handleFetchFile()
    },[fileId])

    return (
        <div className="border border-ink rounded-lg my-2 mx-2">
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)}/>
            <button onClick={handleUpload} disabled={!file ||uploading}>
                {uploading ? "Uplaoding..." : "" }
                image upload
            </button>
            {/* <button onClick={handleFetchFile} disabled={!file ||uploading}>
                {uploading ? "Uplaoding..." : "" }
               display
            </button> */}
            {fileUrl && (
                <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img src={fileUrl} alt="Uploaded" width={600} className="rounded border" />
                </div>
            )}
        </div>
    );

}