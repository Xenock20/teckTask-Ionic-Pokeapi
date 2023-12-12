import React from "react";
import "./PokeBallSpinner.css"; // Ajusta el nombre de tu archivo de estilos
import pokeBallImg from "../../assets/img/pokeball.png";
import pokemonLogo from "../../assets/img/pokemonLogo.png";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-container">
        <img
          src={pokemonLogo} 
          alt="Poké Ball"
          className="pokemon-logo"
        />
      <div className="spinner">
        <img
          src={pokeBallImg} 
          alt="Poké Ball"
          className="pokeball"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
