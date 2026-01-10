import { useEffect, useState } from "react"


function Tytuł(){
    const [title, setTitle] = useState<string>("");
    useEffect(() => {
        document.title = title;
    });
    return (
        <div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
    )
}
export default Tytuł