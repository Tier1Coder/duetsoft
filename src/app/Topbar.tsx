'use client'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      const menu = menuRef.current?.querySelector('.mobile-menu');
      const btn = menuRef.current?.querySelector('.menu-btn');
      if (
        menu &&
        !menu.contains(e.target as Node) &&
        btn &&
        !btn.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <header className="topbar">
      <div className="wrap" ref={menuRef}>
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
