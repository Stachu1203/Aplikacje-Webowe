import { useState } from "react";
import Przycisk from "./Przycisk";

function NowyLicznik(){
    const [counter, setCounter] = useState<number>(0);
    return (
        <div>
            <p>Aktualny stan licznika: {counter}</p>
            <Przycisk onClick={() => setCounter(counter+1)}></Przycisk>
        </div>
    )
}

export default NowyLicznik;