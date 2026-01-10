import { useState } from "react";
import DodajStudenta from "./DodajStudenta";

interface Student {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

function Studenci(){
    const [Studenci, setStudenci] = useState<Student[]>([{imie: "Jan", nazwisko: "Kowalski", rocznik: 2020}, {imie: "Anna", nazwisko: "Nowak", rocznik: 2021}, {imie: "Piotr", nazwisko: "Wiśniewski", rocznik: 2019}]);
    return (
        <div>
            <table>
                <tbody>
                    {Studenci.map((student, index) => (
                        <tr key={index}>{student.imie} {student.nazwisko} {student.rocznik}</tr>
                    ))}
                </tbody>
            </table>

            <div>
                <DodajStudenta dodajStudenta={setStudenci} />
            </div>
        </div>
    )
}
export default Studenci;