import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Holi Self Force Surprise';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom, #ff0844, #ffb199)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px',
          color: 'white',
          textAlign: 'center',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 40 }}>
          🎨 Holi Self Force
        </div>
        <div style={{ fontSize: 42, maxWidth: '80%' }}>
          Create your colorful celebration memories
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}