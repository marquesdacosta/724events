import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus ? data.focus.sort((evtA, evtB) => // rajout de data?.focus ? pour s'assurer que byDateesc ne renverra pas d'erreur si data.focus est undefined.
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ).reverse() : []; // ajout du reverse pour passé en ordre décroissant.

  console.log("byDateDesc:", byDateDesc);

  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length -1  ? index + 1 : 0), // ajout du -1 pour eviter que l'index soit egale a 3 
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={radioIdx} // Utilisation de l'index des puces pour les key
                  type="radio"
                  readOnly  // Ajout du readOnly pour que l'input soit en lecture seul (l'utilisateur ne pourra pas modifié la valeur et donc naviguer a l'aide des puces)
                  name="radio-button"
                  checked={index === radioIdx} // ajout de index pour prendre en compte l'index , idx etant defini dans la fonction .map et donc pas disponible ici
                />
              ))}
            </div>
          </div>
          </div> // Suppression du fragment vide , afin que les clés des enfants des boucles .map soient correctement rendu
      ))}
    </div>
  );
};

export default Slider;
