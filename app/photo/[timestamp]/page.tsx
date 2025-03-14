'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { use } from 'react';

interface PageProps {
  params: Promise<{ timestamp: string }>; // params is now a Promise
}

export default function Page({ params }: PageProps) {
  const unwrappedParams = use(params); // Unwrap the Promise
  const { timestamp } = unwrappedParams;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedImage = localStorage.getItem(`image_${timestamp}`);
      if (storedImage) {
        setImageUrl(storedImage);
      }
      setLoading(false);
    }
  }, [timestamp]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Image not found.</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <Image
        src={imageUrl}
        alt="Holi Celebration"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
  );
}