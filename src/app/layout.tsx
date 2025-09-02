import './globals.css';
import Link from 'next/link';
import Topbar from './Topbar';
import type { ReactNode } from 'react';

const siteDescription =
  'Stajnia Decyma - jazda konna, szkółka jeździecka, stajnia Lubuskie, Świebodzin, Sulechów. Oferta, aktualności, kontakt. Zapraszamy!';

export const metadata = {
  title: 'Stajnia Decyma',
  description: siteDescription,
  robots: 'index, follow',
  icons: { icon: '/favicon.ico' },
  alternates: { canonical: 'https://stajniadecyma.pl/' },
  keywords:
    'stajnia decyma, stajnia lubuskie, stajnia świebodzin, stajnia sulechów, szkółka jeździecka, jazda konna, nauka jazdy konnej, pensjonat dla koni, jazdy konne lubuskie, jazdy konne świebodzin, jazdy konne sulechów, jazdy konne, szkolka jezdziecka, jazda konna lubuskie, jazda konna świebodzin, jazda konna sulechów, atrakcje lubuskie, konie',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <title>Stajnia Decyma</title>
        <meta name="description" content={siteDescription} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href="https://stajniadecyma.pl/" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Stajnia Decyma" />
        <meta property="og:description" content={siteDescription} />
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
