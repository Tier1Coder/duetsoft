export const metadata = { title: 'Kontakt | Stajnia Decyma' };

export default function KontaktPage() {
  return (
    <div className="page-bg">
      <section className="card card--text">
        <div className="wrap">
          <h1>Kontakt</h1>
          <p>Masz pytania lub chcesz umówić jazdę? Skontaktuj się z nami.</p>

          <div className="contact-grid">
            <div>
              <h2>Dane kontaktowe</h2>
              <ul className="contact-list">
                <li><strong>Telefon:</strong> <a href="tel:+48795759410">+48 795 759 410</a></li>
                <li><strong>E-mail:</strong> <a href="mailto:stajniadecyma@icloud.com">stajniadecyma@icloud.com</a></li>
                <li><strong>Adres:</strong> Stajnia Decyma, 66-235 Darnawa 28</li>
                <li><strong>Godziny:</strong> pn–pt 9:00–19:00, sob–niedz 10:00–17:00</li>
              </ul>

              <div className="contact-cta">
                <a className="btn-primary" href="tel:+48795759410">Zadzwoń teraz</a>
                <a className="btn-primary" href="mailto:stajniadecyma@icloud.com">Napisz e-mail</a>
              </div>
            </div>

            <div>
              <h2>Lokalizacja</h2>
              <div className="map-box">
                <iframe
                  title="Mapa dojazdu"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2447.6618157351318!2d15.520087213228472!3d52.1586596718518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4706690012ec46d5%3A0xef145a89d30479c!2sStajnia%20Decyma!5e0!3m2!1spl!2sus!4v1755714635236!5m2!1spl!2sus"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
