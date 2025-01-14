import "../styles/css/Tarifs.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Tarifs() {
  return (
    <div className="tarifs-container" style={{ marginBottom: "300px" }}>
      <div id="tarifsCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* Carte 1 : Programmes Fitness */}
          <div className="carousel-item active">
            <div className="text-center">
              <div className="card-body mx-2">
                <h2 className="card-title bg-danger display-4 py-2 text-light" style={{fontFamily: "Rubik Mono One"}}>Programmes Fitness</h2>
                <h3 className="card-title border text-light bg-dark py-1">Débutant - Intermédiaire - Avancé - Expert</h3>
                <h4 className="card-text display-5 fw-bold text-danger"><i class="bi bi-patch-check"></i> 50 <i className="bi bi-currency-euro"></i> / programme</h4>
                <ul className="list-unstyled list-group list-group-flush ">
                  <li className="list-group-item">Choix de niveau : Débutant à Expert</li>
                  <li className="list-group-item">Chaque niveau comprend 3 séances d'entraînements / semaine</li>
                  <li className="list-group-item">Des conseils nutritionnels</li>
                </ul>
                <button className="btn fw-bold btn-danger py-3 px-4 btn-red">AJOUTER AU PANIER <i className="bi bi-caret-right"></i></button>
              </div>
            </div>
          </div>

          {/* Carte 2 : Meal Planner */}
          <div className="carousel-item">
            <div className="text-center">
              <div className="card-body mx-2">
                <h2 className="card-title bg-success display-4 py-2 text-light" style={{fontFamily: "Rubik Mono One"}}>Meal Planner</h2>
                <h3 className="card-title border text-light bg-dark py-1">Planning repas mensuel</h3>
                <h4 className="card-text display-5 fw-bold text-success"><i class="bi bi-patch-check"></i> 80 <i className="bi bi-currency-euro"></i> / mois sans engagement</h4>
                <ul className="list-unstyled list-group list-group-flush ">
                <li className="list-group-item">Chaque fin de semaine, recevez votre planning repas hebdomadaire</li>
                <li className="list-group-item">Facilite l'atteinte de vos abjectifs</li>
                <li className="list-group-item">Des repas sur mesure pour gérer le total calorique</li>
                </ul>
                <button className="btn fw-bold btn-success btn-green py-3 px-4">AJOUTER AU PANIER <i className="bi bi-caret-right"></i></button>
              </div>
            </div>
          </div>

          {/* Carte 3 : Home Coaching */}
          <div className="carousel-item">
            <div className="text-center">
              <div className="card-body mx-2">
                <h2 className="card-title display-4 py-2 text-light" style={{backgroundColor: "#dec950", fontFamily: "Rubik Mono One"}}>Home Coaching</h2>
                <h3 className="card-title border text-light bg-dark py-1">Coach personnel à domicile</h3>
                <h4 className="card-text display-5 fw-bold" style={{ color:"#dec950" }}><i class="bi bi-patch-check"></i> 1300 <i className="bi bi-currency-euro"></i> / Forfait 20 séances</h4>
                <ul className="list-unstyled list-group list-group-flush ">
                <li className="list-group-item">Un bilan de forme gratuit</li>
                <li className="list-group-item">Des entraînements sur mesure</li>
                <li className="list-group-item">Des conseils alimentaires personnalisés</li>
                <li className="list-group-item">Ton coach disponible 6 jours / 7 </li>
                <li className="list-group-item">Un suivi hebdomadaire avec ton coach</li>
                <li className="list-group-item">Ton coach en présentiel sur toutes tes séances</li>
                <li className="list-group-item">Des bilans et ajustements réguliers à chaque séance</li>
                <li className="list-group-item">Ton coach disponible 7j / 7</li>
                </ul>
                <button className="btn text-light fw-bold py-3 px-4 btn-or">AJOUTER AU PANIER <i className="bi bi-caret-right"></i></button>
              </div>
            </div>
          </div>

          {/* Carte 4 : E-Coaching */}
          <div className="carousel-item">
            <div className="text-center">
              <div className="card-body mx-2">
                <h2 className="card-title display-4 py-2 text-light" style={{backgroundColor: "purple", fontFamily: "Rubik Mono One"}}>E-Coaching</h2>
                <h3 className="card-title border text-light bg-dark py-1">Coaching à distance</h3>
                <h4 className="card-text display-5 fw-bold" style={{color: "purple"}}><i class="bi bi-patch-check"></i> 120 <i className="bi bi-currency-euro"></i> / mois</h4>
                <ul className="list-unstyled list-group list-group-flush  list-group list-group-flush ">
                <li className="list-group-item">Un bilan de forme gratuit</li>
                <li className="list-group-item">Des entraînements sur mesure</li>
                <li className="list-group-item">Des conseils alimentaires personnalisés</li>
                <li className="list-group-item">Ton coach disponible 6 jours / 7 </li>
                <li className="list-group-item">Un suivi hebdomadaire avec ton coach</li>
                </ul>
                <button className="btn text-light fw-bold py-3 px-4 btn-purple">AJOUTER AU PANIER <i className="bi bi-caret-right"></i></button>
              </div>
            </div>
          </div>
        </div>

        {/* Contrôles du Carousel */}
        <button className="carousel-control-prev" type="button" data-bs-target="#tarifsCarousel" data-bs-slide="prev">
        <i className="bi bi-arrow-left-circle" style={{ fontSize: "2rem", color: "#000" }}></i>

          <span className="visually-hidden">Précédent</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#tarifsCarousel" data-bs-slide="next">
          <i class="bi bi-arrow-right-circle" style={{fontSize: "2rem", color: "#000"}}></i>
          <span className="visually-hidden">Suivant</span>
        </button>

      </div>
    </div>
  );
}
