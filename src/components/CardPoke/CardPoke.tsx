import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonImg,
} from "@ionic/react";

export default function CardPoke({ data }: any) {
  return (
    <>
      {data.map((e: any, i: any) => (
        <IonCard key={i}>
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
    </>
  );
}
