'use client'
import Link from 'next/link'
import { useState } from 'react'

const menuLinks = [
  { href: '/onas', label: 'O nas' },
  { href: '/aktualnosci', label: 'Aktualności' },
  { href: '/oferta', label: 'Oferta' },
  { href: '/konie', label: 'Nasze konie' },
  { href: '/regulamin', label: 'Regulamin' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="wrap">
        <Link href="/" className="brand">Stajnia Decyma</Link>
        <nav className="menu">
          {menuLinks.map(link => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>
        <button
          className="menu-btn"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          Menu
        </button>
        <nav className={`mobile-menu${menuOpen ? ' open' : ''}`}>
          {menuLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
