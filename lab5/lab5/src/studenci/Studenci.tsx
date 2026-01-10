interface Student {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

function Studenci(){
    const Student : Student[] = [{imie: "Jan", nazwisko: "Kowalski", rocznik: 2020}, {imie: "Anna", nazwisko: "Nowak", rocznik: 2021}, {imie: "Piotr", nazwisko: "Wiśniewski", rocznik: 2019}];
    return (
        <div>
            <table>
                <tbody>
                    {Student.map((student, index) => (
                        <tr key={index}>{student.imie} {student.nazwisko} {student.rocznik}</tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Studenci;