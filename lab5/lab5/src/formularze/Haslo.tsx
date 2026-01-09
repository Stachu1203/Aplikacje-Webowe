import { useState } from "react"

 function Haslo(){

    const [text, setText] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setText(event.target.value);
    };

    const newPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value);
    };

    const checkPassword = (text: string,password: string) => {
        if(text === "" || password ===""){
            return <p>Proszę wprowadzić hasło</p>
        }
        if (text !== password){
            return <p>Hasła nie są zgodne</p>
        }
    }

    return (
        <div>
            <input type="text" onChange={handleChange} value = {text}/>
            <input type="text" onChange={newPassword} value = {password} />
            <div>{checkPassword(text,password)}</div>
        </div>
    )
 }

 export default Haslo