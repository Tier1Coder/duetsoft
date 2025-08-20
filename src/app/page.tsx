import Image from 'next/image';
import Link from 'next/link';

export const metadata = { title: 'Stajnia Decyma' };

export default function HomePage() {
  return (
    <div className="page-bg">

      {/* Karta: logo */}
      <section className="card card--logo">
        <div className="wrap">
          <div className="logo-box">
            <Image src="/logo.png" alt="Stajnia Decyma" fill priority />
          </div>
        </div>
      </section>

      {/* Karta: opis + zdjęcie */}
      <section id="onas" className="card card--hero">
        <div className="wrap">
          <div className="hero">
            <div className="hero__text">
              <p>
                Zapraszamy do Stajni Decyma – miejsca, w którym pasja do koni spotyka się z gościnnością i naturą.
                Oferujemy naukę jazdy konnej dla dzieci i dorosłych, rekreacyjne wypady w teren, imprezy okolicznościowe
                i nie tylko. Jeśli szukasz wypoczynku z dala od zgiełku miasta, nasza skromna stajnia będzie idealnym
                wyborem. Sprawdź naszą ofertę i przekonaj się, jak wyjątkowy może być czas spędzony w siodle i w otoczeniu przyrody.
              </p>
            </div>

            <div className="hero__image">
              <Image src="/hero.jpg" alt="Konie na pastwisku" fill sizes="(max-width: 1024px) 100vw, 520px" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
