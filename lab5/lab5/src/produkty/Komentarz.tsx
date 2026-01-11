
interface User {
    id : number;
    username : string;
    fullName : string;
}

interface KomentarzProps {
    id : number;
    body : string;
    postId : number;
    likes : number;
    
    user : User;
}
function Komentarz({ body, user, likes } :  KomentarzProps) {
    return <div>Komentarz</div>
}

export default Komentarz;   