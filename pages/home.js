import { useEffect, useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import { useQuery } from "@apollo/client";
import { GET_FIRST_SIXTY_POKEMONS } from "./queries/firstSixtyPokemons";

function Home() {
  const { loading, err, data } = useQuery(GET_FIRST_SIXTY_POKEMONS, {
    variables: 60,
  });
  const [pokemonData, setpokemonData] = useState([]);
  const [startIndex, setstartIndex] = useState(0);
  const [lastIndex, setlastIndex] = useState(20);
  const [dataIncrement, setDataIncrement] = useState(20);
  const itemsPerPage = 20;
  const firstFetchedData = 60;

  useEffect(() => {
    fetch("https://graphql-pokemon2.vercel.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
                          query pokemons($first: Int!) {
                              pokemons(first: $first) {
                                id
                                number
                                name
                                types
                                image
                              }
                            }`,
        variables: {
          first: firstFetchedData,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => setpokemonData(data.data.pokemons));
  }, []);

  const loadNextTwentyPokemons = () => {
    setstartIndex(startIndex + 20);
    setlastIndex(lastIndex + 20);
    if (lastIndex >= firstFetchedData) {
      fetch("https://graphql-pokemon2.vercel.app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
                          query pokemons($first: Int!) {
                              pokemons(first: $first) {
                                id
                                number
                                name
                                types
                                image
                              }
                            }`,
          variables: {
            first: firstFetchedData + dataIncrement,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => setpokemonData(data.data.pokemons));
      setDataIncrement(dataIncrement + itemsPerPage);
    }
  };

  const loadPreviousTwentyPokemons = () => {
    if (startIndex > 0) {
      setstartIndex(startIndex - 20);
      setlastIndex(lastIndex - 20);
    }
  };

  const openPokemonDetails = (pokemonName) => {
    window.open(pokemonName, "_self");
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Pokemon Catalog</h2>
      </div>
      <div className={styles.pokemonList}>
        {pokemonData.slice(startIndex, lastIndex).map((item, id) => {
          return (
            <div
              key={id}
              className={styles.pokemonItems}
              onClick={() => openPokemonDetails(item.name)}
            >
              <img
                src={item.image}
                alt="pokemonImg"
                className={styles.pokemonItemsImg}
              />
              <div className={styles.pokemonItemsNumber}>#{item.number}</div>
              <div className={styles.pokemonItemsName}>{item.name}</div>
              <ul className={styles.pokemonItemsTypesList}>
                {item.types.map((pokemonTypes, subid) => {
                  return <li key={subid}>{pokemonTypes}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className={styles.paginationBtn}>
        <div
          className={styles.paginationBckBtn}
          onClick={loadPreviousTwentyPokemons}
        >
          Back
        </div>
        <div
          className={styles.paginationNxtBtn}
          onClick={loadNextTwentyPokemons}
        >
          Next
        </div>
      </div>
    </>
  );
}

export default Home;
