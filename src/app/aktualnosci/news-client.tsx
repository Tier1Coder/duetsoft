'use client';

import { useEffect, useState } from 'react';

type Photo = { id: string; url: string; caption?: string | null };
type Post = { id: string; title: string; body?: string | null; createdAt: string; photos: Photo[] };

export default function NewsClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [rows, setRows] = useState<{ file?: File; caption: string }[]>([{ caption: '' }]);
  const [adminCode, setAdminCode] = useState('');

  async function load() {
    const res = await fetch('/api/news', { cache: 'no-store' });
    const data = await res.json();
    setPosts(data);
  }

  useEffect(() => { load(); }, []);

  function addRow() {
    setRows(r => [...r, { caption: '' }]);
  }
  function updateRow(i: number, patch: Partial<{ file: File; caption: string }>) {
    setRows(r => {
      const copy = [...r];
      copy[i] = { ...copy[i], ...patch };
      return copy;
    });
  }
  function removeRow(i: number) {
    setRows(r => r.filter((_, idx) => idx !== i));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData();
    fd.set('title', title);
    fd.set('body', body);
    rows.forEach(row => {
      if (row.file) fd.append('images', row.file);
      fd.append('captions', row.caption || '');
    });
    const res = await fetch('/api/news', {
      method: 'POST',
      body: fd,
      headers: { 'x-news-code': adminCode || '' },
    });
    if (!res.ok) {
      alert('Błąd zapisu (sprawdź NEWS_ADMIN_CODE na serwerze)');
      return;
    }
    setTitle('');
    setBody('');
    setRows([{ caption: '' }]);
    await load();
  }

  return (
    <>
      {/* Edytor (prosty – zabezpieczony kodem) */}
      <details style={{ marginBottom: 16 }}>
        <summary>Dodaj wpis (admin)</summary>
        <form onSubmit={submit} className="news-form">
          <label>
            Kod admina
            <input type="password" value={adminCode} onChange={e => setAdminCode(e.target.value)} required />
          </label>

          <label>
            Tytuł
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
          </label>

          <label>
            Treść (opcjonalnie)
            <textarea value={body} onChange={e => setBody(e.target.value)} rows={4} />
          </label>

          <div className="news-rows">
            {rows.map((row, i) => (
              <div className="news-row" key={i}>
                <input type="file" accept="image/*" onChange={e => updateRow(i, { file: e.target.files?.[0] })} />
                <input type="text" placeholder="Podpis do zdjęcia (opcjonalnie)" value={row.caption} onChange={e => updateRow(i, { caption: e.target.value })} />
                {rows.length > 1 && <button type="button" onClick={() => removeRow(i)}>Usuń</button>}
              </div>
            ))}
            <button type="button" onClick={addRow}>Dodaj zdjęcie</button>
          </div>

          <button type="submit" className="btn-primary">Zapisz wpis</button>
        </form>
      </details>

      {/* Lista wpisów */}
      <div className="news-list">
        {posts.map(p => (
          <article className="news-item" key={p.id}>
            <h3>{p.title}</h3>
            {p.body && <p>{p.body}</p>}
            <div className="news-photos">
              {p.photos.map(ph => (
                <figure className="news-photo" key={ph.id}>
                  <img src={ph.url} alt={ph.caption || p.title} />
                  {ph.caption && <figcaption>{ph.caption}</figcaption>}
                </figure>
              ))}
            </div>
            <div className="news-meta">Dodano: {new Date(p.createdAt).toLocaleString('pl-PL')}</div>
          </article>
        ))}
      </div>
    </>
  );
}
