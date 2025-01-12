import { Link } from "react-router-dom";
import evaluation from "../styles/images/bilan.jpg";
import telephoner from "../styles/images/telephoner.jpg";
import domicile from "../styles/images/abs.jpg";
import progres from "../styles/images/progres.jpg"

export default function PersonalTraining() {
  return (
    <div className="container" style={{ marginBottom: "100px" }}>
      {/* Titre principal */}
      <div className="text-center mb-5">
        <h2 className="display-4 fw-bold text-success">Personal Training à Domicile <i className="bi bi-house-door-fill"></i></h2>
        <p className="lead">Un coaching sur-mesure, directement chez toi ou dans le lieu de ton choix !</p>
      </div>

      {/* Étapes du coaching */}
      <div className="row g-5">
        {/* Étape 1 */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <img src={telephoner} alt="téléphoner" className="w-100 img-fluid object-fit-cover" />
            <div className="card-body">
              <h4 className="card-title">📞 Étape 1 : Me contacter</h4>
              <p className="card-text">
                Contacte-moi directement :
              </p>
              <div className="d-grid gap-2">
                <a href="tel:0659141503" className="btn btn-outline-primary">
                  Appelle-moi <i className="bi bi-telephone-fill"></i>
                </a>
                <a href="mailto:f.roblot.coulanges@gmail.com" className="btn btn-outline-success">
                  Écris-moi <i className="bi bi-envelope-fill"></i>
                </a>
                <Link to="/contact" className="btn btn-outline-dark">
                  Formulaire de contact <i className="bi bi-chat-dots-fill"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Étape 2 */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <img src={evaluation} alt="Bilan de forme" className="card-img-top img-fluid" />
            <div className="card-body">
              <h4 className="card-title">📝 Étape 2 : Bilan de forme</h4>
              <p className="card-text">
                Lors de notre premier rendez-vous, je me rends directement chez toi ou sur le lieu de ton choix pour réaliser un bilan de forme complet.
                Cela me permet de comprendre ton passé sportif, tes habitudes et tes objectifs afin d'adapter parfaitement les séances à venir.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Étape 3 */}
      <div className="row g-5 mt-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <img src={domicile} alt="Entraînement à domicile" className="w-100 img-fluid object-fit-cover" />
            <div className="card-body">
              <h4 className="card-title">🏋️ Étape 3 : Séances d'entraînement personnalisées</h4>
              <p className="card-text">
                J'organise des séances adaptées directement chez toi ou dans le lieu qui te convient. Les séances incluent :
              </p>
              <ul>
                <li>📌 Programmes sur mesure en fonction de tes objectifs</li>
                <li>💪 Matériel fourni si nécessaire</li>
                <li>🔄 Adaptation des exercices selon ton niveau et tes progrés</li>
                <li>🤝 Présence constante pour te guider et te motiver</li>
              </ul>
              <p>
                Plus besoin de te déplacer à la salle de sport, je viens à toi pour des séances efficaces et motivantes !
              </p>
            </div>
          </div>
        </div>

        {/* Étape 4 */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <img src={progres} alt="Suivi de progression" className="w-100 img-fluid object-fit-cover" />
            <div className="card-body">
              <h4 className="card-title">📈 Étape 4 : Suivi de tes progrès</h4>
              <p className="card-text">
                Ensemble, nous suivons ton évolution pour ajuster les séances et progresser efficacement. Je reste disponible pour échanger après chaque entraînement :
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">✅ Je me sens en pleine forme !</li>
                <li className="list-group-item">💪 Ça travaille bien, quelques courbatures !</li>
                <li className="list-group-item">😵 Séance intense, mais motivé(e) !</li>
                <li className="list-group-item">🚑 Trop dur, on ajuste pour la prochaine !</li>
              </ul>
              <p className="mt-3">
                Contacte-moi à tout moment :
              </p>
              <ul>
                <li>Téléphone <i className="bi bi-phone"></i></li>
                <li>WhatsApp <i className="bi bi-whatsapp text-success"></i></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
