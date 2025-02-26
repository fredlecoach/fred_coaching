import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer bg-light py-4">
      <div className="container">
        {/* Grille Bootstrap avec 4 colonnes dès les écrans moyens */}
        <div className="row row-cols-1 row-cols-md-4 g-4 text-center text-md-start">
          {/* Les programmes */}
          <div className="col d-flex flex-column align-items-center align-items-md-start">
            <h5 className="text-uppercase" style={{ color: "goldenrod" }}>Les programmes</h5>
            <ul className="list-unstyled text-start">
              <li><Link className="text-decoration-none text-dark" to="/debutant">🔥 Débutant</Link></li>
              <li><Link className="text-decoration-none text-dark" to="/intermediaire">🔥🔥 Intermédiaire</Link></li>
              <li><Link className="text-decoration-none text-dark" to="/avance">🔥🔥🔥 Avancé</Link></li>
              <li><Link className="text-decoration-none text-dark" to="/expert">🔥🔥🔥🔥 Expert</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col">
            <h5 className="text-uppercase" style={{ color: "goldenrod" }}>Contact</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-envelope"></i> <a href="mailto:fredlecoach@gmail.com" className="text-decoration-none text-dark">Contacter par mail</a></li>
              <li><i className="bi bi-phone"></i> <a href="tel:0659141503" className="text-decoration-none text-dark">Contacter par Tél</a></li>
              <li><a href="#contact-form" className="text-decoration-none text-dark">Formulaire de contact</a></li>
              <li><small>Horaires : Lun - Ven de 09h00 à 19h00</small></li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div className="col">
            <h5 className="text-uppercase" style={{ color: "goldenrod" }}>Réseaux sociaux</h5>
            <ul className="list-unstyled d-flex justify-content-center justify-content-md-start gap-3">
              <li><a href="#twitter" className="text-dark"><i className="bi bi-twitter"></i></a></li>
              <li><a href="#instagram" className="text-dark"><i className="bi bi-instagram"></i></a></li>
              <li><a href="#facebook" className="text-dark"><i className="bi bi-facebook"></i></a></li>
            </ul>
          </div>

          {/* Informations */}
          <div className="col">
            <h5 className="text-uppercase" style={{ color: "goldenrod" }}>Informations</h5>
            <ul className="list-unstyled">
              <li><a href="#cgu" className="text-decoration-none text-dark">CGU</a></li>
              <li><a href="#cgv" className="text-decoration-none text-dark">CGV</a></li>
              <li><a href="#privacy-policy" className="text-decoration-none text-dark">Politique de confidentialité</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          <p className="small text-muted">&copy; {new Date().getFullYear()} - Fred RC - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
