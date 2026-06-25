"use client";

import { useState } from "react";

export default function ImageUpload(){

    const [ file, setFile ] = useState<File | null>(null);
    const [ uploading, setUploading ] = useState(false);
    const [ imageUrl, setImageUrl ] = useState<string | null>(null);

    const handleUpload = async () => {
        if(!file) return;
        setUploading(true);
        try{
            const res = await fetch('api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ fileName: file.name, contentType: file.type }),
            });

            const { uploadUrl, dbRecord } = await res.json();

            const uploadRes = await fetch(uploadUrl, {
                method: "PUT",
                body: file,
                headers: { 'Content-Type': file.type }
            });

            if(uploadRes.ok){
                setImageUrl(dbRecord.url);
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
    return (
        <div>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)}/>
            <button onClick={handleUpload} disabled={!file ||uploading}>
                {uploading ? "Uplaoding..." : "UploadImage" }
            </button>
            { imageUrl && <img src={imageUrl} alt="Uploaded" width={300} />}
        </div>
    );

}