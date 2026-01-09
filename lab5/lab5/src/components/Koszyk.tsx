interface KoszykProps {
  children: React.ReactNode; 
}

function Koszyk({ children }: KoszykProps) {
  return (
    <div style={{ border: '2px solid black', padding: '10px' }}>
      <h2>Twój Koszyk:</h2>
      {children} 
    </div>
  );
}

export default Koszyk;