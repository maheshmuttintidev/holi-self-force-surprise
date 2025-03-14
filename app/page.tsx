/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';

const HomePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
      }
    }
  };
// Your existing client-side code
const capturePhoto = async () => {
  if (canvasRef.current) {
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setImageUrl(dataUrl);
    setIsCaptured(true);

    // Create a temporary link element to open the image in a new tab
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'captured-image.png'; // Set the filename for download
    link.target = '_blank'; // Open in a new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the link after the download
  }
};



  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const onPlaying = () => {
        applyHoliEffects();
      };
      videoElement.addEventListener('playing', onPlaying);

      return () => {
        videoElement.removeEventListener('playing', onPlaying);
      };
    }
  }, []);

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
      {!isCaptured ? (
        <div className=''>
          <button
            onClick={applyHoliEffects}
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Apply Holi Effects
          </button>
          <button
            onClick={capturePhoto}
            style={{
              position: 'absolute',
              top: '20px',
              left: '220px',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Capture Photo
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;
