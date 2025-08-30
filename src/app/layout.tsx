import './globals.css';
import Link from 'next/link';
import Topbar from './Topbar';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Stajnia Decyma',
  description: 'Stajnia Decyma - jazda konna, oferta, aktualności, kontakt. Zapraszamy!',
  robots: 'index, follow',
  icons: { icon: '/favicon.ico' },
  alternates: { canonical: 'https://stajniadecyma.pl/' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <title>Stajnia Decyma</title>
        <meta name="description" content="Stajnia Decyma - jazda konna, oferta, aktualności, kontakt. Zapraszamy!" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://stajniadecyma.pl/" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Stajnia Decyma" />
        <meta property="og:description" content="Stajnia Decyma - jazda konna, oferta, aktualności, kontakt. Zapraszamy!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stajniadecyma.pl/" />
        <meta property="og:image" content="/logo.png" />
      </head>
      <body className="footer-bg">
        <Topbar />
        <main>{children}</main>
        <footer className="footer-cta">
          <div className="wrap center">
            <Link href="/kontakt" className="btn-primary">
              Skontaktuj się z nami
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
