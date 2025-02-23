import { Link } from "react-router-dom";
import evaluation from "../styles/images/bilan.jpg";
import telephoner from "../styles/images/telephoner.jpg";
import workout from "../styles/images/workout plan.jpg";
import evolution from "../styles/images/evolution.jpg";
import ScrollMagic from "scrollmagic";
import {gsap} from "gsap"
import { useEffect } from "react";

export default function ECoaching( {addCart, prestation} ) {

  useEffect(() => {
    const defiler = new ScrollMagic.Controller();
  
    document.querySelectorAll(".card").forEach((card) => {
      new ScrollMagic.Scene({
        triggerElement: card,
        triggerHook: .8,
        reverse: false
      })
        .on('enter', () => {
          gsap.fromTo(card, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 });
        })
        .addTo(defiler);
    });
  }, []);
  


  return (
    <div className="container" style={{marginBottom: "100px"}}>
      {/* Titre principal */}
      <div className="text-center mb-5">
        <h2 className="display-4 fw-bold text-primary">E-coaching <i className="bi bi-laptop"></i></h2>
        <p className="lead">Un accompagnement sur-mesure, où que tu sois !</p>
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
                Ensemble, nous réalisons un bilan complet pour comprendre ton passé sportif, tes habitudes alimentaires, et ton mode de vie.
                Ce diagnostic me permet de concevoir un programme d'entraînement et de nutrition adapté à tes besoins.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Étape 3 */}
      <div className="row g-5 mt-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <img src={workout} alt="planning programme" className="w-100 img-fluid object-fit-cover" />
            <div className="card-body">
              <h4 className="card-title">📋 Étape 3 : Préparation de tes programmes</h4>
              <p className="card-text">
                Une fois le bilan réalisé, je crée un programme personnalisé qui inclut :
              </p>
              <ul>
                <li>✅ Un planning d'entraînement détaillé (nombre de séances, types d'exercices, durée)</li>
                <li>🍽️ Des conseils nutritionnels adaptés à tes besoins et objectifs</li>
                <li>📆 Un calendrier de progression pour suivre ton évolution pas à pas</li>
                <li>🎥 Des démonstrations vidéo pour chaque exercice afin d'assurer une exécution correcte</li>
                <li>📊 Des ajustements réguliers en fonction de tes ressentis et de ta progression</li>
              </ul>
              <p>
                L'objectif est de te proposer un programme clair, motivant et totalement adapté à ton rythme de vie.
              </p>
            </div>
          </div>
        </div>

        {/* Étape 4 */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
          <img src={evolution} alt="suivi d'volution" className="w-100 img-fluid object-fit-cover" />
            <div className="card-body">
              <h4 className="card-title">📈 Étape 4 : Suivi de tes progrès</h4>
              <p className="card-text">
                Je suis ton évolution pour adapter le programme selon tes ressentis. Après chaque entraînement, envoie-moi ton feedback :
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">✅ Tout va bien, aucune courbature</li>
                <li className="list-group-item">💪 Quelques courbatures mais ça va</li>
                <li className="list-group-item">😵 Beaucoup de courbatures, mais je tiens le coup</li>
                <li className="list-group-item">🚑 Courbatures extrêmes, je n'arrive plus à marcher</li>
              </ul>
              <p className="mt-3">
                Tu peux me joindre à tout moment :
              </p>
              <ul>
                <li>Téléphone <i className="bi bi-phone"></i></li>
                <li>WhatsApp <i className="bi bi-whatsapp text-success"></i> : réponse rapide garantie !</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center my-5">
        <button className="btn btn-dark py-3 px-4" onClick={ ()=> { addCart(prestation); alert(' "E-coaching" a été ajouté au panier')  }   }>ajouter au panier <i className="bi bi-caret-right"></i> 120 €</button>
      </div>
      <hr/>
      <div className="d-flex d-inline-block mt-5">
        <h4>Découvrir l'autre formule</h4>
        <Link to="/personal_training" className="mx-2"><button className="btn btn-warning fw-bold shadow">Le coaching à domicile </button></Link>
      </div>
    </div>
  );
}
