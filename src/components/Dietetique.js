import { useState } from 'react'; // Importer useState pour gérer les états
import planning from '../styles/images/planning.jpg';
import "../styles/css/Home.css";
import { Link } from 'react-router-dom';

export default function Dietetique() {
  // Déclarer les états pour le poids, la taille et l'IMC
  const [poids, setPoids] = useState("");
  const [taille, setTaille] = useState("");
  const [imc, setImc] = useState("");

  // Définir les couleurs pour l'IMC
  const colorImc = {
    "insuffisance pondérale": "#f36113",
    "poids normal": "#35ca1e",
    "surpoids": "#7e1eca",
    "obésité modérée": "#c5ca1e",
    "obésité sévère": "#fd8200",
    "obésité morbide": "#fd0036",
    "N/A" : "#fff"
    
  };

  // Déclarer l'état pour la couleur et la fonction handleColor
  const [color, setColor] = useState("");

  // Fonction pour gérer la couleur en fonction de l'IMC
  const handleImc = () => {
    if (poids && taille) {
      const calculatedImc = poids / (taille / 100) ** 2;
      const imcValue = calculatedImc.toFixed(1);
      setImc(imcValue);

      if (imcValue < 18.5) {
        setColor(colorImc["insuffisance pondérale"]);
      } else if (imcValue >= 18.5 && imcValue < 24.9) {
        setColor(colorImc["poids normal"]);
      } else if (imcValue >= 25 && imcValue < 29.9) {
        setColor(colorImc["surpoids"]);
      } else if (imcValue >= 30 && imcValue < 34.9) {
        setColor(colorImc["obésité modérée"]);
      } else if (imcValue >= 35 && imcValue < 39.9) {
        setColor(colorImc["obésité sévère"]);
      } else if (imcValue >= 40) {
        setColor(colorImc["obésité morbide"]);
      }
    } else {
      alert("Veuillez entrer le poids et la taille");
    }
  };

  // reset imc
  const resetImc = () => {
    setImc("");
    setColor(colorImc["N/A"])
  }

  // Fonction pour calculer les calories (inchangée)
  const [age, setAge] = useState("");
  const [calories, setCalories] = useState("");
  const [sexe, setSexe] = useState(""); // Sexe sélectionné (homme/femme)
  const [poidsCal, setPoidsCal] = useState("");
  const [tailleCal, setTailleCal] = useState("");
  const [activite, setActivite] = useState("1.2");

  const calculCalories = () => {
    if (age && poidsCal && tailleCal && sexe) {
      let formule = 0;
      if (sexe === "homme") {
        formule = 10 * poidsCal + 6.25 * tailleCal - 5 * age + 5;
      } else if (sexe === "femme") {
        formule = 10 * poidsCal + 6.25 * tailleCal - 5 * age - 161;
      }
      const totalCalories = (formule * parseFloat(activite)).toFixed(2);
      setCalories(totalCalories);
    } else {
      alert("Veuillez entrer toutes les informations requises");
    }
  };

  const resetCalories= () => {
    setCalories('')
  }


  return (
    <div className="container">
      <section>
        <h2>Des idées reçues</h2>
        <p>
            L'alimentation est souvent sous-estimée dans sa capacité à influencer la prise ou la perte de poids. On pense souvent que le plus difficile réside dans l'entraînement. Certes, pendant l'entraînement, on se donne à fond, on transpire, on souffre parfois, mais cela ne dure qu'une à deux heures, maximum, et c'est fini, généralement plusieurs fois par semaine.
          </p>
          <p>
            En revanche, la diététique exige une rigueur bien plus grande, car il faut se nourrir plusieurs fois par jour, tous les jours, selon les méthodes adoptées. L'alimentation est en effet indissociable de la perte ou de la prise de poids, ainsi que de la prise de muscle. On peut s'entraîner très dur et ne voir que peu, voire aucun, résultat sur nos objectifs. Et cela peut être décourageant. Dans la majorité des cas, hormis les problèmes hormonaux ou de santé spécifiques, ce manque de résultats vient d'une mauvaise gestion de l'alimentation.
          </p>
          <p>
            À tort, beaucoup pensent qu'ils peuvent se permettre de manger des pains au chocolat, des quiches, et autres, simplement parce qu'ils se sont entraînés dur. Mais les choses ne sont pas aussi simples. De nombreux facteurs entrent en jeu dans la perte de poids ou la prise de masse :
          </p>
          <ul className="text-primary">
            <li>le sommeil</li>
            <li>le niveau de sédentarité</li>
            <li>le cycle menstruel pour les femmes</li>
            <li>le stress et bien d'autres éléments</li>
          </ul>

        <div className="row row-cols-1 row-cols-md-2">
          {/* Colonne 1 */}
          <div className="col mb-4">
            <img src={planning} alt="planning repas" className="w-100 object-fit-cover" />
          </div>
          {/* Colonne 2 */}
          <div className="col mb-4">
            <h2 className='border p-2' style={{color: "goldenrod"}}>MA SOLUTION</h2>
            <p>Je t'envoie chaque semaine ton <span className='text-secondary fw-bold'>Meal Planner</span> sur 7 jours qui tient compte de tes besoins journaliers.</p>
            <p>La seule chose qui te reste à faire, ce sont les courses pour suivre le planning.</p>
            <p>Pour optimiser l'atteinte de tes objectifs, tu auras aussi besoin d ete munir d'une balance pour peser tes aliments</p>

            <section className='border p-2 bg-light' style={{marginBottom: "50px"}}>
              <h4>Prix : 80 € / mois</h4>
              <p>Bénéficiez de tous vos planning repas pendant un mois</p>
            </section>

            <h4>Calculer son IMC(Indice de Masse Corporelle)</h4>
            <table className='table table-bordered' style={{marginBottom: "50px"}}>
              <thead>
                <tr>
                  <th>Calculateur d'IMC</th>
                  <th scope="col">Poids (kg)</th>
                  <th scope="col">Taille (cm)</th>
                  <th scope='col'>Résultat IMC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <button className='btn btn-primary ' onClick={handleImc}>Calculer</button>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={poids}
                      onChange={(e) => setPoids(e.target.value)}
                      placeholder="en kg"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={taille}
                      onChange={(e) => setTaille(e.target.value)}
                      placeholder="en cm"
                      className="form-control"
                    />
                  </td>
                  <td className='fw-bold text-primary'>{imc ? imc : "N/A"} 
                    <button className='btn btn-warning' onClick={resetImc}>reset</button></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Interprétation</th>
                  <td colSpan={3} style={{ color: color }} className='fw-bold'>
                    { imc && imc < 18.5
                      ? "Insuffisance pondérale - maigreur"
                      : imc && imc >= 18.5 && imc < 24.9
                      ? "Poids normal"
                      : imc && imc >= 25 && imc < 29.9
                      ? "Surpoids"
                      : imc && imc >= 30 && imc < 34.9
                      ? "Obésité modérée"
                      : imc && imc >= 35 && imc < 39.9
                      ? "Obésité sévère"
                      : imc && imc >= 40
                      ? "Obésité morbide"
                      : "N/A"
                    }
                  </td>
                </tr>
              </tfoot>
            </table>
            {/* aside */}
            <aside>
              <h5>Informations</h5>
              <p style={{textAlign: "justify", marginBottom: "100px"}}>L'IMC doit être interprété avec prudence, car il ne prend pas en compte la morphologie, la répartition de la masse musculaire ou la composition corporelle. Ainsi, il peut ne pas refléter fidèlement l'état de santé global d'une personne. Donc il est à prendre au sérieux ou pas au cas par cas. Malgré tout il peut donner des indices précieux dans certains cas.</p>
            </aside>
            <div className='d-flex justify-content-center'>
              <Link to="/contact">
                <button className='btn btn-dark py-3 px-4 bouton-perso'>Contacter <i className='bi bi-caret-right'></i></button>
              </Link>
            </div>
            
          </div>
        </div>
        {/* Calcul des calories */}
        <h4>Calculer ses besoins caloriques</h4>
              <table className="table table-striped table-bordered" style={{marginBottom: "100px"}}>
                <thead>
                  <tr>
                    <th>Calculateur de calories</th>
                    <th>Sexe</th>
                    <th>Poids</th>
                    <th>Taille</th>
                    <th>Âge</th>
                    <th>Niveau d'activité</th>
                    <th>Besoins journaliers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <button className='btn btn-primary' onClick={calculCalories}>Calculer</button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label>
                          <input type='radio' name='sexe' value="homme" onChange={(e) => setSexe(e.target.value)} /> Homme
                        </label>
                        <label>
                          <input type='radio' name='sexe' value="femme" onChange={(e) => setSexe(e.target.value)} /> Femme
                        </label>
                      </div>
                    </td>
                    <td>
                      <input className='form-control' type='number' value={poidsCal} onChange={(e) => setPoidsCal(e.target.value)} placeholder='kg' />
                    </td>
                    <td>
                      <input className='form-control' type='number' value={tailleCal} onChange={(e) => setTailleCal(e.target.value)} placeholder='cm' />
                    </td>
                    <td>
                      <input className='form-control' type='number' value={age} onChange={(e) => setAge(e.target.value)} placeholder='ans' />
                    </td>
                    <td>
                      <select value={activite} onChange={(e) => setActivite(e.target.value)}>
                        <option value="1.2">Sédentaire</option>
                        <option value="1.375">Activité légère</option>
                        <option value="1.55">Activité modérée</option>
                        <option value="1.725">Activité intense</option>
                        <option value="1.9">Activité très intense</option>
                      </select>
                    </td>
                    <td>
                      {calories ? `${calories} calories` : "N/A"}
                      <button className='btn btn-warning' onClick={resetCalories}>Reset</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            {/*  */}
      </section>
    </div>
  );
}
