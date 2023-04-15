import { createContext, useState } from "react";

const UserContext = createContext();

const FetchPokemons = (props) => {
  const [pokemonData, setpokemonData] = useState([]);

  fetch("https://graphql-pokemon2.vercel.app/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query pokemons($first: Int!){
            pokemons(first: $first){
              id
              number
              name
              weight{
                minimum
                maximum
              }
              height{
                minimum
                maximum
              }
              classification
              types
              resistant
              weaknesses
              fleeRate
              maxCP
              maxHP
              image
            }
          }`,
      variables: {
        first: 20,
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => setpokemonData(data.data.pokemons));

  return (
    <UserContext.Provider value={pokemonData}>
      {props.children}
    </UserContext.Provider>
  );
};

export default FetchPokemons;
export { UserContext };
