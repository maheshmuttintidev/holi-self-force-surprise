'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const HomePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();
  const [cameraReady, setCameraReady] = useState(false);
  const [captureAttempted, setCaptureAttempted] = useState(false);

  useEffect(() => {
 

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener('loadedmetadata', () => {
            setCameraReady(true);
          });
        }
      } catch (err) {
        console.error('Error accessing the camera:', err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject instanceof MediaStream) {
        const stream = videoRef.current?.srcObject;
        stream.getTracks().forEach((track) => track.stop());
      }
      setCameraReady(false);
    };
  }, []);

  useEffect(() => {
    if (cameraReady && !captureAttempted) {
      const detectAndCapture = async () => {
        setTimeout(async () => { // Added delay
          if (videoRef.current && canvasRef.current) {
              applyHoliEffects();
              capturePhoto();
              setCaptureAttempted(true);
            } else {
              requestAnimationFrame(detectAndCapture);
            }
        }, 1000); // 1-second delay
      };
      detectAndCapture();
    }
  }, [cameraReady, captureAttempted]);

  const applyHoliEffects = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        for (let i = 0; i < 100; i++) {
          ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
          ctx.beginPath();
          ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 50,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
    }
  };

  const capturePhoto = async () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      setImageUrl(dataUrl);

      const timestamp = Date.now().toString();
      localStorage.setItem(`image_${timestamp}`, dataUrl);

      router.push(`/photo/${timestamp}`);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="h-full w-full object-cover transform rotate-y-180"
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="absolute top-0 left-0 h-full w-full transform rotate-y-180"
      />

      {imageUrl && (
        <div className="absolute top-4 right-4 bg-white/70 p-4 rounded-md">
          <p className="mb-2">Your Holi celebration photo has been captured!</p>
          <img
            src={imageUrl}
            alt="Captured"
            className="mb-2 h-24 w-auto object-cover"
          />
          <p>
            Share your photo: <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Photo</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;