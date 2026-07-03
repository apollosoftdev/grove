
import { prisma } from "@/lib/prisma";
import { use } from "react";
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getProductData(productId: string) {
  return await prisma.product.findUnique({
    where: { id: productId },
    include: {
      image: {
        include: {
          file: true,
        },
      },
    },
  });
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }>}) {
    const resolvedParams = await params;
    const productId = resolvedParams.id;

    // CRITICAL: You MUST await the database fetch
    const product = await getProductData(productId);

    if (!product) {
        notFound();
    }

    // Define your MinIO endpoint (use an environment variable in production)
    const minioEndpoint = 'http://localhost:9000';

    return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {product.image.map((relation) => {
            const { file } = relation;
            // console.log(file);
            // Construct the local MinIO URL structure
            const minioUrl = `${minioEndpoint}/${file.bucket}/${file.fileName}`;
            // console.log(minioUrl);  
            return (
                <div key={relation.id} className="border rounded-lg p-2 bg-gray-50">
                <div className="relative aspect-square w-full">
                    {/* Standard HTML img tag for local development */}
                    <img
                    src={minioUrl}
                    alt={file.originalName}
                    className="w-full h-full object-cover rounded"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">
                    {file.originalName}
                </p>
                </div>
            );
        })}
      </div>
    </div>
  );
}