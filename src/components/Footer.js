import { Link } from "react-router-dom";

export default function Footer() {

  // Liste des programmes par niveau
  // const programs = {
  //   Débutants: ["KickOff 30", "BasicBurn", "MoveEasy"],
  //   Intermédiaires: ["FitBurn 30", "PulseUp", "CorePower"],
  //   Avancés: ["RageMode 30", "FireFlex", "IronCore"],
  //   Experts: ["BeastMode 30", "EliteFit", "OlympianGod"],
  // };

  return (
    <footer className="footer bg-light py-4">
      <div className="container">
        {/* Section principale : Répartition horizontale */}
        <div className="d-flex justify-content-between flex-wrap">
          {/* Les programmes */}
          <div className="footer-section mb-4">
            <h5 className="text-uppercase" style={{color: "goldenrod"}}>Les programmes</h5>
            <ul>
              <li className="list-unstyled"><Link className="text-decoration-none text-dark" to="/debutant"> 🔥 Débutant</Link></li>
              <li className="list-unstyled"><Link className="text-decoration-none text-dark" to="/intermediaire">🔥🔥 Intermédiaire</Link></li>
              <li className="list-unstyled"><Link className="text-decoration-none text-dark" to="avance"> 🔥🔥🔥 Avancé</Link></li>
              <li className="list-unstyled"><Link className="text-decoration-none text-dark" to="/expert">🔥🔥🔥🔥 Expert</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section mb-4">
            <h5 className="text-uppercase" style={{color: "goldenrod"}}>Contact</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-envelope"></i><a
                  href="mailto:fredlecoach@gmail.com"
                  className="text-decoration-none text-dark"
                > Contacter par mail
                </a>
              <li><i className="bi bi-phone"></i><a href="tel:0659141503" className="text-decoration-none text-dark">Contacter par Tél</a></li>
              </li>
              <li>
                <a href="#contact-form" className="text-decoration-none text-dark">
                  Formulaire de contact
                </a>
              </li>
              <li><small>Horaires : Lun - Ven de 09h00 à 19h00</small></li>
            </ul>
          </div>

          {/* réseaux sociaux */}
          <div className="footer-section mb-4">
            <h5 className="text-uppercase" style={{color: "goldenrod"}}>Réseaux sociaux</h5>
            <ul className="list-unstyled text-decoration-none d-flex flex-column align-items-center">
              <li><a href="#twitter"><i className="bi bi-twitter text-dark"></i></a></li>
              <li><a href="#instagram"><i className="bi bi-instagram text-dark"></i></a></li>
              <li><a href="#facebook"><i className="bi bi-facebook text-dark"></i></a></li>
            </ul>
          </div>

          {/* Informations */}
          <div className="footer-section mb-4">
            <h5 className="text-uppercase" style={{color: "goldenrod"}}>Informations</h5>
            <ul className="list-unstyled">
              <li><a href="#cgu" className="text-decoration-none text-dark">CGU</a></li>
              <li><a href="#cgv" className="text-decoration-none text-dark">CGV</a></li>
              <li>
                <a
                  href="#privacy-policy"
                  className="text-decoration-none text-dark"
                >
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          <p className="small text-muted">
            &copy; {new Date().getFullYear()} - Fred RC - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
