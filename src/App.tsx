import { useEffect, useState } from "react";
import "./App.css";

//creo la funcio que llamara el numero aleatorio usando un api
//():Promise<number> va a retorna una promesa y esa promesa va a resolver un numero
const getNumberRandom = async (): Promise<number> => {
  //hacemos la peticion
  const res = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  );
  //guardamos la peticion en tipo txt
  const numberString = await res.text();

  //retornamos oblogatoriamente, el simbolo + lo convierte en un numero JS +numberString;
  return +numberString;
};

export const App = () => {
  //estado que almacena el numoer aleatorio tipandolo que sea un dato solo numerico
  const [number, setNumber] = useState<number>();

  //cuando se monte el componente ejecuta esto de primero
  useEffect(() => {
    //llamamos a la funcion que trae el numero aleatorio y cuando finalice de resolver lo que hace lo guardamos en el state
    getNumberRandom().then((num) => setNumber(num));
  }, []);

  return (
    <div className="App App-header">
      <h2>Numero Aleatorio: {number}</h2>
    </div>
  );
};

export default App;
