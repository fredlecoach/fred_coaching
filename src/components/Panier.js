import "../styles/css/Panier.css";
import { useState } from "react";

export default function Panier() {
  const [panier, setPanier] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantite, setQuantite] = useState(0);

  // Fonction pour afficher un message si le panier est vide
  const panierVide = () => {
    if (panier.length < 1) {
      return (
        <div className="bg-panier">
          <div className="border p-5 bg-white col-3 ">
            <h3>Votre panier est vide</h3>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {panier.map((produit, index) => (
            <div key={index} className="panier__item">
              <h3>{produit.nom}</h3>
              <p>Prix : {produit.prix} €</p>
              <p>Quantité : {produit.quantite}</p>
            </div>
          ))}
          <h2>Total : {total} €</h2>
        </div>
      );
    }
  };

  return (
    <div className="panier">
      
      <div className="panier__contenu">
        <div className="panier__produit">
          {panierVide()} {/* ✅ Exécution correcte de la fonction */}
        </div>
      </div>

    </div>
  );
}
