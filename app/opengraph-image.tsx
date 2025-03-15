import { ImageResponse } from 'next/og';

export const alt = 'Mahesh Muttinti';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function Image() {
  return new ImageResponse(
    (
      <div
        className={roboto.className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'white',
          width: '100%',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <img
          src="https://i.ibb.co/C5XHCCt1/i-1-min.png"
          alt="Website Icon"
          style={{
            width: '200px',
            height: '200px', // Adjust height as needed
            borderRadius: '50%',
            marginBottom: '20px', // Space between image and text
          }}
        />
        <div
          style={{
            fontSize: 100,
            color: '#000',
          }}
        >
          Holi Self Force Surprise
        </div>
        <p style={{ fontSize: 42, maxWidth: '80%' }}>
          Create your colorful celebration memories
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
