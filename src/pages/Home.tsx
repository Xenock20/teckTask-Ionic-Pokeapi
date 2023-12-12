// components/Home.tsx
import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import usePokeData from "../hooks/usePokeData";
import LoadingSpinner from "../components/pokeballSpineer/PokeBallSpinner";

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
