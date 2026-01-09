import { useState } from "react"

 function Logowanie(){

    const [text, setText] = useState<string>("");
    
    const [password, setPassword] = useState<string>("");

    const [login, setLogin] = useState<string>("");

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
          setText(event.target.value);
    };

    const newPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value);
    };

    const handleLogin = (event : React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }

    const tryLogin = (password: string, password2: string) => {
        if(password === password2){
            alert("Zalogowano poprawnie");
        }
        else{
            alert("Hasła nie są zgodne");
        }
    }

    const generateButton = (login: string, password: string, password2: string) => {
        if(login === "" || password === "" || password2 === ""){
            return <button disabled>Zaloguj</button>
        }
        else{
            return <button onClick = {() => tryLogin(password,password2)}>Zaloguj</button>
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <label htmlFor="login">Login</label>
            <input id="login" type="text" onChange={handleLogin} value={login}/>
            <label htmlFor="password">Hasło</label>
            <input id="password" type="text" onChange={handlePassword} value = {text}/>
            <label htmlFor="password2">Powtórz hasło</label>
            <input id="password2" type="text" onChange={newPassword} value = {password} />

            {generateButton(login, text, password)}
            
        </div>
    )
 }

 export default Logowanie