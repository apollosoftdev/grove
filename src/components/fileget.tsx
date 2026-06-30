import { useState, useEffect } from "react";

interface ImageGetProps {
  id: string;
}

export default function FileUrl( { id }: ImageGetProps ){

    const [ fileUrl, setFileUrl ] = useState<File | undefined>(undefined);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        async function loadData(){
        try{
            const response = await fetch(`api/upload/${id}`);

            if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
            const data = await response.json();

            setFileUrl(data.url);

        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
            console.error("Error loading file:", err);
        }
    }

        loadData();

    }, [id])
    return { fileUrl, error };

}