import { useEffect, useReducer, useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

//creo la funcion que llamara el numero aleatorio usando un api
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

export const App = () => {
  //el primer arreglo [] es como queremos que react-query manejara el cache
  //segundo es la funcion que se usara para cargar la informacion
  //query optendara todo lo relacionado con la petecion.
  const query = useQuery(["ramdomNumber"], getNumberRandom);

  return (
    <div className="App App-header">
      {/* si isLoading es verdadera muestra el cargando */}
      {query.isFetching ? (
        <h2>Cargando...</h2>
      ) : (
        <h2>Numero Aleatorio: {query.data}</h2>
      )}

      {!query.isLoading && query.isError && <h3>{`${query.error}`}</h3>}

      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        {query.isFetching ? "..." : "Nuevo Numero"}
      </button>
    </div>
  );
};

export default App;
