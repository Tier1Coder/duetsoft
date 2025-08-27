import DOMPurify from 'isomorphic-dompurify';
import { NEWS } from './news';

export const metadata = { title: 'Aktualności | Stajnia Decyma' };

export default function AktualnosciPage() {
  const posts = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="page-bg">
      <section className="card card--text">
        <div className="wrap">
          <h1>Aktualności</h1>
          <div className="news-grid">
            {posts.map(post => (
              <article key={post.id} className="news-card">
                <div className="news-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="news-body">
                  <h2 className="news-title">{post.title}</h2>
                  <time className="news-date">{post.date}</time>
                  <div
                    className="news-desc"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
