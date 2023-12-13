import { gql } from "@apollo/client";

const pokeApi = gql`
  query samplePokeAPIquery($offset: Int!) {
    pokemon_v2_pokemon(limit: 10, offset: $offset) {
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

export default pokeApi;
