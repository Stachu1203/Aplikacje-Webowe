import { useEffect, useState } from "react"


function Licznik2(){
    const [counter, setCounter] = useState<number>(0);
     useEffect(() => {
            console.log("Hello world");
        }, []);
    
    useEffect(() => {
            console.log(`Licznik zwiekszył się do: ${counter}`);
        });

   
    return (
    

    <div>
        <p>Stan licznika: {counter}</p>
        <button onClick = {() => setCounter(counter + 1)}> Zwiększ licznik</button>
    </div>
    );
}

export default Licznik2