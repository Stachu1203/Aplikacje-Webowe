import { useState } from "react";

function DodajStudenta(props: {dodajStudenta: any}) {
    const [imie, setImie] = useState<string>("");
    const [nazwisko, setNazwisko] = useState<string>("");
    const [rocznik, setRocznik] = useState<number>(0);

    const handleChangeImie = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImie(e.target.value);
    }   
    const handleChangeNazwisko = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNazwisko(e.target.value);
    }   
    const handleChangeRocznik = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRocznik(parseInt(e.target.value));
    }
    const validateInput = () => {
        if(imie === "" || nazwisko === "" || rocznik <= 0) {
            return false;
        }
        if(typeof rocznik !== "number" || isNaN(rocznik)) {
            return false;
        }
        return true;
    }   
    return (
        <div>
            <label htmlFor="">Imie</label>
            <input type="text" value={imie} onChange={handleChangeImie} />
            <label htmlFor="">Nazwisko</label>
            <input type="text" value={nazwisko} onChange={handleChangeNazwisko} />
            <label htmlFor="">Rocznik</label>
            <input type="number" value={rocznik} onChange={handleChangeRocznik} />

            <button onClick={() => {
                if(!validateInput()) {
                    alert("Niepoprawne dane studenta!");
                    return;
                }
                props.dodajStudenta((prevStudents: any) => [...prevStudents, {imie: imie, nazwisko: nazwisko, rocznik: rocznik}]);
                setImie("");
                setNazwisko("");
                setRocznik(0);
            }}>Dodaj Studenta</button>
        </div>
    )

}
export default DodajStudenta;