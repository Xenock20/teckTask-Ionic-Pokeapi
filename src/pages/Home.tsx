// components/Home.tsx
import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonImg,
} from "@ionic/react";
import "./Home.css";
import usePokeData from "../hooks/usePokeData";
import LoadingSpinner from "../components/pokeballSpineer/PokeBallSpinner";
import pokemonLogo from "../assets/img/pokemonLogo.png";

const Home: React.FC = () => {
  const pokeDataResult = usePokeData();

  if (!pokeDataResult) {
    // Manejar el caso donde usePokeData retorna null
    console.log("Datos no disponibles todavía...");
    return (
      <IonPage>
        <IonHeader></IonHeader>
        <IonContent fullscreen>
          <LoadingSpinner></LoadingSpinner>
        </IonContent>
      </IonPage>
    );
  }

  const { loading, error, pokeData } = pokeDataResult;

  console.log(pokeData);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="centered-content">
          <img src={pokemonLogo} alt="Pokemon Logo" className="logo" />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {pokeData.map((e: any) => (
          <IonCard key={e.id}>
            <IonImg src={e.pokemon_v2_pokemonsprites}></IonImg>
            <IonCardHeader>
              <IonCardTitle>
                <h1 className="name-poke">
                  {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                </h1>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>
                    <h1>Exp. Base: {e.base_experience}</h1>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h1>Altura: {e.height / 10}m</h1>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h1>Peso: {e.weight / 10}kg</h1>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonList>
                    <h1>Habilidades:</h1>
                    {e.pokemon_v2_pokemonabilities.map((e: any, i: number) => (
                      <IonItem key={i}>
                        <IonLabel>
                          <h2>
                            {e.pokemon_v2_ability.name.charAt(0).toUpperCase() +
                              e.pokemon_v2_ability.name.slice(1)}
                          </h2>
                        </IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
