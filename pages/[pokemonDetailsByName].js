import { useRouter } from "next/router";
import { useContext } from "react";
import styles from "../styles/Home.module.css";
import { UserContext } from "./fetchPokemons";

function pokemonDetailsByName() {
  const router = useRouter();
  const pokemonName = router.query.pokemonDetailsByName;
  const pokemonData = useContext(UserContext);

  return (
    <>
      <div className={styles.pokemonByNameContainer}>
        {pokemonData.map((item, id) => {
          return item.name == pokemonName ? (
            <div key={id} className={styles.pokemonContainer}>
              <img src={item.image} alt="pokemonImg" />
              <div className={styles.pokemonDetails}>
                <div className={styles.idName}>
                  <div className={styles.pokemonId}>#{item.number}</div>
                  <h2 className={styles.pokemonName}>{item.name}</h2>
                </div>

                <div className={styles.minMaxHeight}>
                  <div className={styles.minHeight}>
                    Minimum Height : {item.height.minimum}
                  </div>
                  <div className={styles.maxHeight}>
                    Maximum Height : {item.height.maximum}
                  </div>
                </div>

                <div className={styles.minMaxWeight}>
                  <div className={styles.minWeight}>
                    Minimum Weight : {item.weight.minimum}
                  </div>
                  <div className={styles.maxWeight}>
                    Maximum Weight : {item.weight.maximum}
                  </div>
                </div>

                <p>Pokemon Types</p>
                <ul className={styles.pokemonTypes}>
                  {item.types.map((pokemonTypes, id) => {
                    return <li key={id}>{pokemonTypes}</li>;
                  })}
                </ul>

                <p>Pokemon Weakness</p>
                <ul className={styles.pokemonWeakness}>
                  {item.weaknesses.map((pokemonWeaknesses, id) => {
                    return <li key={id}>{pokemonWeaknesses}</li>;
                  })}
                </ul>

                <p>Pokemon Resistant</p>
                <ul className={styles.pokemonResistant}>
                  {item.resistant.map((pokemonResistant, id) => {
                    return <li key={id}>{pokemonResistant}</li>;
                  })}
                </ul>
                <div className={styles.evolutionBtn}>Evolution</div>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </>
  );
}

export default pokemonDetailsByName;
