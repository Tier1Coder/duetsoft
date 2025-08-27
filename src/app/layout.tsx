import './globals.css'
import Link from 'next/link'
import Topbar from './Topbar'

export const metadata = { title: 'Stajnia Decyma' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className="footer-bg">
        <Topbar />
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