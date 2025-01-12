import { useState } from "react";

export default function Title({ couleur, children, hidden, ...props }) {
  const [edit, setEdit] = useState({
    modele: "",
    marque: "",
    prix: "",
    couleur: "",
  });

  const handleEdit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    console.log("Modifications sauvegardées :", edit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  if (hidden) {
    return null;
  }

  return (
    <div>
      <h1 style={{ color: couleur }} {...props}>
        {children}
      </h1>
      <p>
        Modèle de la voiture : <br /> {edit.modele} : {edit.prix} €
      </p>
      <p>Marque de la voiture : {edit.marque}</p>
      <p>Couleur de la voiture : {edit.couleur}</p>
      <form onSubmit={handleEdit}>
        <label>
          Modèle :
          <input
            type="text"
            name="modele"
            value={edit.modele}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Marque :
          <input
            type="text"
            name="marque"
            value={edit.marque}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Prix (€) :
          <input
            type="text"
            name="prix"
            value={edit.prix}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Couleur :
          <input
            type="text"
            name="couleur"
            value={edit.couleur}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Sauvegarder</button>
      </form>
    </div>
  );
}
