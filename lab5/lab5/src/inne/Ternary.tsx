 function Ternary(){
    let a : boolean = true;
    let b : boolean = false;
    return (
        <>
        <div>
          {a ? <p>Stwierdzenia a jest prawdziwe</p> : <p>Stwierdzenie a jest fałszywe</p>}
        </div>
        <div>
          {b ? <p>Stwierdzenia b jest prawdziwe</p> : <p>Stwierdzenie b jest fałszywe</p>}
        </div>
        </>
    )
 }

 export default Ternary