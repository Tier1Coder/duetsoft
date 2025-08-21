'use client';

import { useState } from 'react';

type Horse = {
  id: number;
  name: string;
  img: string;
  desc: string;
  alt: string;
};

const HORSES: Horse[] = [
  { id: 1,  name: 'Decyma', img: '/decyma.jpg', alt: 'Decyma', desc: 'To od niej wszystko się zaczęło. Ma już swoje lata, ale wciąż jest pełna energii. Ma duszę konia wyścigowego, ale jest też świetna w ujeżdżeniu. Jest prawdziwą przywódczynią stada – spokojna, opiekuńcza i zawsze pierwsza wita ludzi na padoku.' },
  { id: 2,  name: 'Sauron', img: '/sauron.jpg', alt: 'Sauron', desc: 'W stepie lubi zamulać, ale na przeszkodach pokazuje pazur. Kocha skakać i galopować. Jest to zdecydowanie typ misia. Uwielbia drapanie po szyi i zazwyczaj przy czyszczeniu przysypia.' },
  { id: 3,  name: 'Agawa',  img: '/agawa.jpg', alt: 'Agawa', desc: 'Jest to klacz z charakterem, raczej niedotykalska, lecz pod jeźdzcem to koń doskonały. Podejmuje się wszystkich nowych zadań, chętnie się uczy i niczego się nie boi. Chętnie chodzi w samotne tereny.' },
  { id: 4,  name: 'Luluś',  img: '/lulek.jpg', alt: 'Luluś', desc: 'Kucyk który potrafi wiele, ale najbardziej lubi pracować z dziećmi. Najgrzeczniejszy z całej ekipy, nie potrzebuje kantara, aby wrócić do stajni z padoku.' },
  { id: 5,  name: 'Maja',   img: '/majazdj.jpg', alt: 'Maja', desc: 'Maja to klacz o pięknej maści, która uwielbia spędzać czas na łące. Jest bardzo zżyta z Marlen. Kocha kontakt z naturą, lecz jest na etepie zajazdki. Lubi coś spsocić pod jeźdźcem.' },
  { id: 6,  name: 'Marlen', img: '/marlen.jpg', alt: 'Marlen', desc: 'Niestety, Marlen jest już na emeryturze. Spędza czas na pastwisku, ciesząc się spokojem wraz ze swoją córką Mają. Za to pięknie się prezentuje, idealnie nadaje się do sesji zdjęciowych.' },
  { id: 7,  name: 'Alexa',  img: '/alexa.jpg', alt: 'Alexa', desc: 'Alexa jest świetnym skoczkiem, potrzebuje delikatnej ręki, aby pokazać swój pełny potencjał. Zawsze przytula się do swojego jeźdzca. Ma ogromne serce do pracy i nigdy nie zawodzi na parkurze.' },
  { id: 8,  name: 'Wendy',  img: '/wendy.jpg', alt: 'Wendy', desc: 'Jest to najstarszy koń w stajni, ma wiele doświadczenia i jest bardzo cierpliwa. Świetnie nadaje się na pierwsze jazdy dla najmłodszych. To spokojna nauczycielka, która krok po kroku wprowadza jeźdźców w świat koni.' },
  { id: 9,  name: 'Billi',  img: '/billi.jpg', alt: 'Billi', desc: 'Zdecydowanie jest to najabrdziej humorzasty koń w stajni, ma lepsze i gorsze dni, ale mimo to każdy ją uwielbia. Skacze z wielką gracją. Kiedy ma dobry dzień, potrafi oczarować swoim wdziękiem i lekkością ruchu.' },
  { id:10,  name: 'Dragon', img: '/dragon.jpg', alt: 'Dragon', desc: 'Najmłodszy członek naszej gromady, pełen energii i ciekawości świata. Uwielbia spedzać czas z człowiekiem, ale lubi też podszczypywać. Jest wulkanem energii – zapowiada się na świetnego konia terenowego i skokowego.' },
];

export default function HorsesClient() {
  const [activeImg, setActiveImg] = useState<string | null>(null);

  return (
    <div className="page-bg">
      <section className="card card--text">
        <div className="wrap">
          <h1>Nasze konie</h1>
          <p>Każdy z naszych koni ma inny charakter i mocne strony. Poniżej krótka prezentacja stajennej dziesiątki.</p>

          <div className="horses-grid">
            {HORSES.map(h => (
              <figure key={h.id} className="horse-card">
                <button
                  type="button"
                  className="horse-media"
                  onClick={() => setActiveImg(h.img)}
                  aria-label={`Powiększ zdjęcie: ${h.name}`}
                >
                  <img src={h.img} alt={h.alt} />
                </button>
                <figcaption>
                  <div className="horse-name">{h.name}</div>
                  <div className="horse-desc">{h.desc}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {activeImg && (
        <div className="lightbox" onClick={() => setActiveImg(null)}>
          <img src={activeImg} alt="Podgląd konia" />
        </div>
      )}
    </div>
  );
}
