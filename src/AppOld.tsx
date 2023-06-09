import { useEffect, useReducer, useState } from "react";
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

  //sale un errror
  // throw new Error("Auxilio");

  //retornamos oblogatoriamente, el simbolo + lo convierte en un numero JS +numberString;
  return +numberString;
};

export const AppOld = () => {
  //estado que almacena el numoer aleatorio tipandolo que sea un dato solo numerico
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  //hace el llamado de la peticion fetch
  const [key, forceRefetch] = useReducer((x) => x + 1, 0);

  //cuando se monte el componente ejecuta esto de primero que resuleve la promesa del numero aleatorio via api
  useEffect(() => {
    setIsLoading(true);
    //llamamos a la funcion que trae el numero aleatorio y cuando finalice de resolver lo que hace lo guardamos en el state
    getNumberRandom()
      //si se resuelve bien
      .then(setNumber)
      //si da error capturame le error y lo guardamos el mjs del error en el estado de error
      .catch((error) => setError(error.message));

    //agregamos el key de un reducer para forzar el cambio de esta accion
  }, [key]);

  //accion que se realiza si el estado del numero cambia
  useEffect(() => {
    if (number) {
      setIsLoading(false);
    }
  }, [number]);

  //accion si hay un error
  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  return (
    <div className="App App-header">
      {/* si isLoading es verdadera muestra el cargando */}
      {isLoading ? <h2>Cargando...</h2> : <h2>Numero Aleatorio: {number}</h2>}

      {!isLoading && error && <h3>{error}</h3>}

      <button onClick={forceRefetch} disabled={isLoading}>
        {isLoading ? "..." : "Nuevo Numero"}
      </button>
    </div>
  );
};

export default AppOld;
