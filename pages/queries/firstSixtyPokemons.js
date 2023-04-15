import { gql } from "@apollo/client";

export const GET_FIRST_SIXTY_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      types
      image
    }
  }
`;
