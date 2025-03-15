import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
};

export const metadata: Metadata = {
  title: {
    template: '%s | Holi Self Force Surprise',
    default: 'Holi Self Force Surprise'
  },
  metadataBase: new URL('https://holi-self-force-surprise.maheshmuttintidev.in'),
  alternates: {
    canonical: '/',
  },
  description: 'Holi Self Force Surprise by Mahesh Muttinti',
  keywords: ['holi', 'celebration', 'photo', 'effects', 'festival', 'colors'],
  authors: [{ name: 'Mahesh Muttinti' }],
  creator: 'Mahesh Muttinti',
  publisher: 'Mahesh Muttinti',
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Holi Self Force Surprise',
    title: 'Holi Self Force Surprise',
    description: 'Create and share your colorful Holi celebration photos',
    images: '/opengraph-image',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Holi Self Force Surprise',
    description: 'Create and share your colorful Holi celebration photos',
    images: '/twitter-image',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Holi Self Force Surprise" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}