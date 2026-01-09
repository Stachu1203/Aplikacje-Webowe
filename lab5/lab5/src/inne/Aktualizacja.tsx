import { useState } from "react";

function Aktualizacja() {
  // Inicjalizujemy stan obiektem
  const [produkt, setProdukt] = useState({
    nazwa: "Pomidor",
    cena: 50
  });

  const zmienCene = () => {
    setProdukt((prev) => ({
      ...prev,
      cena: 100
    }));
  };

  return (
    <>
      <div>
        <p>Produkt: {produkt.nazwa}</p>
        <p>Cena: {produkt.cena} zł</p>
      </div>
      <button onClick={zmienCene}>Zmień cenę na 100</button>
    </>
  );
}

export default Aktualizacja