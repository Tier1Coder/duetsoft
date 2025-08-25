export const metadata = { title: 'Regulamin | Stajnia Decyma' };

export default function RegulaminPage() {
  return (
    <div className="page-bg">
      <section className="card card--text">
        <div className="wrap">
          <h1>Regulamin</h1>

          <h2>Informacja dla karnetowiczów</h2>
          <ul className="rules-list">
            <li>Karnet ważny jest <strong>30 dni</strong> od dnia zakupu.</li>
            <li>
              W przypadku niepogody lub przyczyn losowych po stronie stajni
              karnet ulega przedłużeniu o kolejny tydzień lub do najbliższego możliwego
              terminu, w którym może odbyć się jazda.
            </li>
            <li>
              Jazdę można odwołać najpóźniej <strong>dzień przed</strong> ustalonym terminem
              <strong> do godziny 20:00</strong> – w przeciwnym razie lekcja przepada.
            </li>
            <li>
              Karnet na <strong>8 treningów/terenów dla 2 osób</strong> może zostać wykorzystany przez dwie osoby
              jeżdżące raz w tygodniu, o ile są rodziną (np. rodzeństwo).
            </li>
            <li>
              Jeśli jeden z karnetowiczów (dotyczy treningów/terenów 2‑osobowych) nie może odbyć jazdy
              w danym tygodniu, druga osoba może wybrać jedną z opcji:
              <ul>
                <li>odbyć trening/teren indywidualny za dopłatą różnicy według cennika,</li>
                <li>odbyć trening z inną osobą – o ile istnieje taka możliwość,</li>
                <li>
                  przedłużyć karnet o kolejny termin (jeśli poinformuje o tym najpóźniej
                  do godziny <strong>20:00 dnia poprzedniego</strong>).
                </li>
              </ul>
            </li>
          </ul>

          <h2>Informacja dla wszystkich jeźdźców</h2>
          <ul className="rules-list">
            <li>
              Liczba osób w grupie jadącej w teren uzależniona jest od liczby klientów
              (instruktor nie jest wliczany).
            </li>
            <li>
              Instruktor dobiera konie według umiejętności jeźdźca i dba o to, by każdy
              miał możliwość jeździć na różnych, odpowiednio dopasowanych koniach.
            </li>
            <li>
              Lista koni do jazdy na dany dzień znajduje się w <strong>gablocie stajni</strong>.
            </li>
            <li>
              Wybór konkretnego ulubieńca do jazdy kosztuje <strong>50 zł</strong>.
              Każdy jeździec będzie miał możliwość pojeździć na wybranym koniu w późniejszym terminie
              bez dodatkowej opłaty, gdy przyjdzie na niego kolej.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
