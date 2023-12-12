// hooks/usePokeData.ts
import { useQuery, gql } from "@apollo/client";

const pokeApi = gql`
  query samplePokeAPIquery {
    pokemon_v2_pokemon(limit: 2) {
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
      console.log(img);
      // Puedes retornar un nuevo objeto con la propiedad modificada si es necesario
      // return { ...e, pokemon_v2_pokemonsprites: img };
    }

    // Puedes retornar el mismo objeto o null, dependiendo de tus necesidades
    // return e;
  });

  return { loading, error, pokeData: newArrPokeData };
};

export default usePokeData;

