import "../styles/css/Home.css";
import { Link } from "react-router-dom";

export const Bouton = ( { url } ) => {

  return (
    <Link to={url} className="btn btn-dark py-3 px-4 bouton-perso">
      Découvrir <i className="bi bi-caret-right"></i>
    </Link>
  );
};
