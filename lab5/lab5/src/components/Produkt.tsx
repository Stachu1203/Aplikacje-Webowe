interface ProduktProps {
  name: string;
}

function Produkt(props : ProduktProps){
    return <p>{props.name}</p>
}

export default Produkt;