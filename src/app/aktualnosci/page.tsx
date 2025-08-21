import NewsClient from './news-client';

export const metadata = { title: 'Aktualności | Stajnia Decyma' };

export default function AktualnosciPage() {
  return (
    <div className="page-bg">
      <section className="card card--text">
        <div className="wrap">
          <h1>Aktualności</h1>
          <NewsClient />
        </div>
      </section>
    </div>
  );
}
