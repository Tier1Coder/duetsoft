export const metadata = { title: 'O nas | Stajnia Decyma' };

export default function OnasPage() {
  return (
    <div className="page-bg">
      <section className="card card--text">
        <div className="wrap">
          <h1>O nas</h1>
          <p>
            Nazywam się Agata, jestem instruktorką i razem z moim partnerem Robertem prowadzę Stajnię Decyma, kameralne, rodzinne miejsce stworzone z pasji do koni i natury. Nasza stajnia znajduje się w malowniczej Darnawie, w otoczeniu lasów i łąk, które idealnie nadają się do codziennych treningów i rekreacyjnych przejażdżek.
          </p>
          <p>
            Nazwa stajni pochodzi od wyjątkowej klaczy - Decymy, która była pierwszym koniem w naszej szkółce i w pewnym sensie zapoczątkowała to miejsce.
          </p>
          <p>
            Na co dzień prowadzę zajęcia z jazdy konnej – zarówno po polsku, jak i po angielsku , dlatego z przyjemnością goszczę także osoby z zagranicy. Robert dba o zaplecze techniczne i organizacyjne, dzięki czemu mogę skupić się na pracy z końmi i jeźdźcami.
          </p>
          <p>
            Moim celem jest stworzenie przestrzeni, w której każdy – bez względu na wiek czy doświadczenie – poczuje radość z obcowania z końmi, nauczy się czegoś nowego i spędzi czas w rodzinnej, przyjaznej atmosferze.
          </p>
          <p>
            W naszej stajni opiekujemy się dziesięcioma pięknymi końmi, które są nie tylko naszymi podopiecznymi, ale przede wszystkim przyjaciółmi i nauczycielami. Każdy z nich ma swój wyjątkowy charakter – od spokojnych i cierpliwych, idealnych dla osób rozpoczynających przygodę z jeździectwem, po bardziej energiczne, które doskonale sprawdzają się podczas jazd w terenie. Z troską dbamy o ich dobrostan, codzienną pielęgnację i odpowiednie warunki, dzięki czemu są zdrowe, zrównoważone i chętnie współpracują z jeźdźcami.
          </p>

          <figure className="onas-image">
            <img src="/agata2.jpg" alt="Agata - instruktorka" />
            <figcaption>Agata - instruktorka i właścicielka</figcaption>
          </figure>

          <figure className="onas-image">
            <img src="/robert.jpg" alt="Robert - współprowadzący" />
            <figcaption>Robert</figcaption>
          </figure>
        </div>
      </section>
    </div>
  )
}
