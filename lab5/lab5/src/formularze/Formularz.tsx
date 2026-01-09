import { useState } from "react"

function Formularz(){
    const [text, setText] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <div>
        <input type="text" 
                value={text} 
                onChange={handleChange} 
                placeholder="Wpisz coś..."/>
            <div>
                Podgląd na żywo: {text}
            </div>
        </div>
    )
}

export default Formularz