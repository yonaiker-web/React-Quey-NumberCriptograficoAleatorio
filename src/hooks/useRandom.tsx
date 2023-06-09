import { useQuery } from "@tanstack/react-query";
import { useEffect, useReducer, useState } from "react";

//creo la funcion que llamara el numero aleatorio usando un api
//():Promise<number> va a retorna una promesa y esa promesa va a resolver un numero
//si no exportamos la funcion queda privada en este modulo, osea en este archivo
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

export const useRandom = () => {
  //el primer arreglo [] es como queremos que react-query manejara el cache
  //segundo es la funcion que se usara para cargar la informacion
  //query optendara todo lo relacionado con la petecion.
  const query = useQuery(["ramdomNumber"], getNumberRandom);

  return query;
};
