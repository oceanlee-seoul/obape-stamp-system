import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OSS - Obape Stamp System',
  description: 'Obape Stamp System - 고객 스탬프 관리 시스템',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
