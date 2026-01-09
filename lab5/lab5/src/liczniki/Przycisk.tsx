interface PrzyciskProps {
    onClick: () => void;         
}
function Przycisk(props : PrzyciskProps){
    return (
        <button onClick = {props.onClick}>Zwieksz licznik</button>
    )
}

export default Przycisk