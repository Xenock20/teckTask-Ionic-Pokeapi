// hooks/usePokeData.ts
import { useQuery, gql } from "@apollo/client";
import dataPoke from './../data/data';

const pokeApi = gql`
  query samplePokeAPIquery {
    pokemon_v2_pokemon {
      id
      name
      weight
      base_experience
      height
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

const arrayRevuelto = (a:Array<any>) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/*
const usePokeData = () => {

  const pokeData = dataPoke?.pokemon_v2_pokemon;

  if (!pokeData) {
    console.log("Datos no disponibles todavía...");
    return null;
  }

  const newArrPokeData = pokeData.map((e: any) => {
    const sprites = e.pokemon_v2_pokemonsprites?.[0]?.sprites;

    if (sprites) {
      const img = sprites.split(",")[0];
      const copyImg = img.split('"')[3];
      return {...e, pokemon_v2_pokemonsprites: copyImg}
    }
  });

  const loading = true
  const error = new Error("");
  
  return { loading, error, pokeData: arrayRevuelto(newArrPokeData) };
};
*/

const usePokeData = () => {
  const { loading, error, data } = useQuery(pokeApi);

  if (loading) console.log("Cargando...");
  if (error) console.error("Error: ", error);
  

  const pokeData = data?.pokemon_v2_pokemon;

  if (!pokeData) {
    console.log("Datos no disponibles todavía...");
    return null;
  }

  const newArrPokeData = pokeData.map((e: any) => {
    const sprites = e.pokemon_v2_pokemonsprites?.[0]?.sprites;

    if (sprites) {
      const img = sprites.split(",")[0];
      const copyImg = img.split('"')[3];
      return {...e, pokemon_v2_pokemonsprites: copyImg}
    }
  });

  //const loading = true
  //const error = new Error("");
  
  return { loading, error, pokeData: arrayRevuelto(newArrPokeData) };
};


export default usePokeData;

