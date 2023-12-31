import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonImg,
} from "@ionic/react";
import "./Home.css";
import LoadingSpinner from "../components/pokeballSpineer/PokeBallSpinner";
import pokemonLogo from "../assets/img/pokemonLogo.png";
import CardPoke from "../components/CardPoke/CardPoke";
import { useQuery } from "@apollo/client";
import arrayRevuelto from "../func/arrayUtils";
import pokeApi from "../graphql/pokeapi";

const Home: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState<any[]>([]);

  const { data, fetchMore } = useQuery(pokeApi, {
    variables: { offset: offset },
  });

  useEffect(() => {
    setOffset(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pokeData = data?.pokemon_v2_pokemon;

  useEffect(() => {
    if (!pokeData || !Array.isArray(pokeData)) {
      console.log("Datos no disponibles todavía...");
      return;
    }

    const newArrPokeData = arrayRevuelto(
      pokeData.map((e: any) => {
        const sprites = e.pokemon_v2_pokemonsprites?.[0]?.sprites;

        if (sprites) {
          const img = sprites.split(",")[0];
          const copyImg = img.split('"')[3];
          return { ...e, pokemon_v2_pokemonsprites: copyImg };
        }

        return e;
      })
    );

    setItems((prevItems) => {
      const uniqueItems = newArrPokeData.filter(
        (newItem) => !prevItems.some((item) => item.id === newItem.id)
      );
      return [...prevItems, ...uniqueItems];
    });
  }, [pokeData]);

  if (items.length === 0) {
    return (
      <IonPage>
        <IonHeader></IonHeader>
        <IonContent fullscreen>
          <LoadingSpinner></LoadingSpinner>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="centered-content">
          <IonImg src={pokemonLogo} alt="Pokemon Logo" className="logo" />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <CardPoke data={items}></CardPoke>
        <IonInfiniteScroll
          onIonInfinite={async (ev) => {
            await fetchMore({
              variables: { offset: offset + 10 },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return {
                  ...prev,
                  pokemon_v2_pokemon: [
                    ...prev.pokemon_v2_pokemon,
                    ...fetchMoreResult.pokemon_v2_pokemon,
                  ],
                };
              },
            });

            setOffset(offset + 10);

            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Home;
