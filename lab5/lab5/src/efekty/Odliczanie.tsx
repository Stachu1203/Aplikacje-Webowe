import { useState, useEffect } from "react";

function Odliczanie() {
   
    const [licznik, setLicznik] = useState<number>(15.0);
    const [czyDziala, setCzyDziala] = useState<boolean>(false);

    useEffect(() => {
        let interval: any = null;

        
        if (czyDziala && licznik > 0) {
            interval = setInterval(() => {
                setLicznik((prev) => {
                    const nowaWartosc = prev - 0.1;
                    
                    return Math.max(0, parseFloat(nowaWartosc.toFixed(1)));
                });
            }, 100); 
        } else if (licznik <= 0) {
            
            setCzyDziala(false);
            clearInterval(interval);
        }

        
        return () => clearInterval(interval);
    }, [czyDziala, licznik]);

    
    const getButtonText = () => {
        if (licznik <= 0) return "Odliczanie zakończone";
        return czyDziala ? "STOP" : "START";
    };

    return (
        <div >
           
            <div >
                {licznik.toFixed(1)} sek
            </div>

            <button
                onClick={() => setCzyDziala(!czyDziala)}
                disabled={licznik <= 0} 
            >
                {getButtonText()}
            </button>
        </div>
    );
}

export default Odliczanie;