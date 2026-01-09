let Produkty : string[] = ["Jabłko", "Gruszka", "Papryka", "Bakłażan", "Cukinia"];

function NowyKoszyk(){
    return( 
    <div style={{ border: '2px solid black', padding: '10px' }}>
        <h2>Twój koszyk</h2>
        {Produkty.map((nazwa,index) => (<p key = {index}>{nazwa}</p>))}
    </div>
    );
}

export default NowyKoszyk;