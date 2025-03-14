/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const HomePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHoliApplied, setIsHoliApplied] = useState(false); // Track Holi effect status
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing the camera:', err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject instanceof MediaStream) {
        const stream = videoRef.current?.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const applyHoliEffects = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        // Apply random Holi paint effects
        for (let i = 0; i < 100; i++) {
          ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
          ctx.beginPath();
          ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 50, 0, Math.PI * 2);
          ctx.fill();
        }
        setIsHoliApplied(true); // Set status when Holi effect is applied
      }
    }
  };

  const capturePhoto = async () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      setImageUrl(dataUrl);

      // Store the base64 image in localStorage
      const timestamp = Date.now().toString(); // Use timestamp as the identifier
      localStorage.setItem(`image_${timestamp}`, dataUrl);

      // Redirect to the page with the image
      router.push(`/photo/${timestamp}`);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'rotateY(180deg)',
        }}
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'rotateY(180deg)',
        }}
      />

      {imageUrl ? <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <p>Your Holi celebration photo has been captured!</p>
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="Captured" style={{ width: '100px', height: 'auto', objectFit: 'cover' }} />
              <p>
                Share your photo: <a href={imageUrl} target="_blank" rel="noopener noreferrer">View Photo</a>
              </p>
            </div>
          )}
        </div>: null}

      {!isHoliApplied ? (
        <button
          onClick={applyHoliEffects}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            border: '2px solid transparent',
            animation: 'blink 2s infinite alternate, flash 1s infinite alternate',
            cursor: 'pointer',
            color: 'white'
          }}
          className='apply-holi-button rounded-md'
        >
          Apply Holi Effects
        </button>
      ) : (
        <button
          onClick={capturePhoto}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            border: '2px solid transparent',
            animation: 'blink 2s infinite alternate, flash 1s infinite alternate',
            cursor: 'pointer',
            color: 'white'
          }}
          className='capture-photo-button rounded-md'
        >
          Capture Photo
        </button>
      )}
    </div>
  );
};

export default HomePage;
