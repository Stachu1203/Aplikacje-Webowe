import { useState } from "react"


function Licznik(){
    const [counter, setCounter] = useState<number>(0);
   
    return (


    <div>
        <p>Stan licznika: {counter}</p>
        <button onClick = {() => setCounter(counter + 1)}> Zwiększ licznik</button>
    </div>
    );
}

export default Licznik