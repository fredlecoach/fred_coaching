import "../styles/css/Tarifs.css"

export default function Tarifs() {
  return (
    <div className="container" style={{ marginBottom: "100px" }}>

      <table className="table table-bordered text-center table-striped custom-table">
        <thead>
          <tr className="program">
            <th scope="col">PROGRAMMES</th>
            <th scope="col">Débutant</th>
            <th scope="col">Intermédiaire</th>
            <th scope="col">Avancé</th>
            <th scope="col">Expert</th>
            <th scope="col">Meal planner</th>
            <th scope="col">E-coaching</th>
            <th scope="col">Home Coaching</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"><i className="bi bi-currency-euro"></i>TARIFS</th>
            <td colSpan={4}>50 € / programme</td>
            <td>80 € / mois</td>
            <td>120 € / mois</td>
            <td>20 séances / 1300 €</td>
          </tr>
          <tr>
            <th scope="row">PRESTATIONS</th>
            <td colSpan={4}>
              <ul>
                <li>3 séances d'entraînements / semaine</li>
                <li>Des conseils alimentaires</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Un planning alimentaire sur mesure</li>
                <li>Des repas quotidiens créent par ton coach</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Un coaching sur mesure</li>
                <li>Des conseils alimentaires personnalisés</li>
                <li>Ton coach disponible 6j / 7 / semaine</li>
                <li>Un bilan avec ton coach chaque fin de semaine</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Un coaching sur mesure</li>
                <li>Des conseils alimentaires personnalisés</li>
                <li>Ton coach présent sur toutes tes séances</li>
                <li>Des bilans et ajustements réguliers à chaque séance</li>
                <li>Ton coach disponible 7j / 7</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}
