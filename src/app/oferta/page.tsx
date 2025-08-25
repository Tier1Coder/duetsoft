export const metadata = { title: 'Oferta | Stajnia Decyma' };

export default function OfertaPage() {
  return (
    <div className="page-bg">
      <section className="card card--text">
        <div className="wrap">
          <h1>Oferta</h1>
          <p>
            W Stajni Decyma dbamy o to, aby każdy – niezależnie od wieku czy poziomu doświadczenia –
            mógł znaleźć coś dla siebie. Oferujemy zarówno pierwsze spotkania z końmi,
            jak i regularne treningi oraz jazdy w terenie. Nasze zajęcia prowadzone są w
            kameralnej atmosferze, z naciskiem na bezpieczeństwo, rozwój umiejętności
            i radość z obcowania z końmi.
          </p>

          <h2>Cennik zajęć</h2>
          <ul>
            <li>Oprowadzanka na kucyku – <strong>35 zł / 15 min</strong></li>
            <li>Lonża od podstaw – <strong>75 zł / 30 min</strong></li>
            <li>Trening/teren indywidualny – <strong>110 zł / h</strong></li>
            <li>Trening/teren dla 2 osób – <strong>80 zł / h za osobę</strong></li>
            <li>Trening/teren dla 3 osób – <strong>70 zł / h (plac, max 4 osoby)</strong></li>
            <li>Teren powyżej 1 h – <strong>1 zł / min</strong></li>
          </ul>

          <h2>Karnety</h2>
          <p>Dla osób, które chcą jeździć regularnie, przygotowaliśmy korzystne karnety:</p>
          <ul>
            <li>Karnet indywidualny x4 – <strong>380 zł</strong></li>
            <li>Karnet indywidualny x8 – <strong>640 zł</strong></li>
            <li>Karnet dla 2 osób x4 – <strong>280 zł</strong></li>
            <li>Karnet dla 2 osób x8 – <strong>500 zł</strong></li>
          </ul>

          <h2>Usługi dodatkowe</h2>
          <p>
            Oprócz regularnych jazd organizujemy również wydarzenia i atrakcje na specjalne okazje:
          </p>
          <ul>
            <li>sesje zdjęciowe z końmi</li>
            <li>urodziny i przyjęcia okolicznościowe</li>
            <li>zawody jeździeckie</li>
            <li>wycieczki szkolne</li>
            <li>ogniska integracyjne</li>
            <li>letnie kolonie i półkolonie</li>
            <li>zimowe półkolonie</li>
            <li>rajdy konne z ogniskiem</li>
            <li>jazdy i lekcje w języku angielskim</li>
          </ul>
          <p>
            Ceny usług dodatkowych ustalane są indywidualnie – skontaktuj się z nami, aby dopasować ofertę
            do Twoich potrzeb.
          </p>
          <p>
            Płatność gotówką lub blikiem.
          </p>
        </div>
      </section>
    </div>
  )
}
