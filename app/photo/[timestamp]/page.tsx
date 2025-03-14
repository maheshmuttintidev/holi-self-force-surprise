'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';


interface PageProps {
  params: {
    timestamp: string; // Define the type of the dynamic segment
  };
}

export default function Page({ params }: PageProps) {    const {timestamp} = params;

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the image from localStorage using the timestamp
    const storedImage = localStorage.getItem(`image_${timestamp}`);
    if (storedImage) {
      setImageUrl(storedImage);
    }
  }, [timestamp]);


  if (!imageUrl) {
    return <p>Loading...</p>;
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
<Image src={imageUrl} alt="Holi Celebration" fill={true} />    </div>
  );
};

