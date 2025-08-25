import './globals.css'
import Link from 'next/link'

export const metadata = { title: 'Stajnia Decyma' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <header className="topbar">
          <div className="wrap">
            <Link href="/" className="brand">Stajnia Decyma</Link>
            <nav className="menu">
              <Link href="/onas">O nas</Link>
              <Link href="/aktualnosci">Aktualności</Link>
              <Link href="/oferta">Oferta</Link>
              <Link href="/konie">Nasze konie</Link>
              <Link href="/regulamin">Regulamin</Link>
              <Link href="/kontakt">Kontakt</Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="footer-cta">
          <div className="wrap center">
            <Link href="/kontakt" className="btn-primary">Skontaktuj się z nami</Link>
          </div>
        </footer>
      </body>
    </html>
  )
}
