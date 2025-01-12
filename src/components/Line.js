import unique from '../styles/images/unique.jpg'
import { Bouton } from '../utils/boutons'
import personal_training from '../styles/images/personal_training.jpg';
import coaching_ligne from '../styles/images/coaching_ligne.jpg';
import repas from '../styles/images/repas.jpg'

export default function Line(){
  return (
    <>
    {/* ligne de séparation */}
    <div className="bg-dark text-light d-flex align-items-center justify-content-center " style={{height: "350px", margin: "100px 0"}}>
      <p className="display-3">Avancer à son ryhtme <i className="bi bi-activity text-light"></i></p>
    </div>
    {/*  */}
    <div className="container" style={{marginBottom: "100px"}}>
      <div className="row row-cols-1 row-cols-md-2">
        <div className="col">
          <img className="w-100" src={unique} alt="être unique" />
        </div>
        <div className="col" style={{lineHeight: "40px", textAlign: "justify"}}>
          <p>Nous sommes tous différents, avec des morphologies variées, des métabolismes qui fonctionnent de manière distincte, des niveaux d'expérience divers, et des parcours de vie uniques. Même si certains points communs peuvent être observés entre individus, chaque personne possède des spécificités qui la rendent unique. C'est pourquoi chacun mérite un programme personnalisé, conçu en fonction de ses capacités, de ses besoins, et de ses disponibilités. Cette approche sur mesure permet de respecter l'individualité de chacun tout en maximisant les chances d'atteindre ses objectifs de manière saine et efficace. <br/>
          <span className='fw-bold'>Pour découvrir les programmes et ma manière de travailler, il faut juste cliquer !</span>  
          </p>
          <div className='d-flex justify-content-end'>
            {/* <button className='btn btn-dark py-3 px-4'>Découvrir <i className='bi bi-caret-right'></i> </button> */}
            <Bouton />
          </div>
        </div>
      </div>
    </div>
    {/* ligne de séparation */}
    <div className="bg-dark text-light d-flex align-items-center justify-content-center " style={{height: "350px", margin: "100px 0"}}>
      <p className="display-3">Des formules adaptées à votre budget <i className="bi bi-piggy-bank text-light"></i></p>
    </div>
    {/*  */}
    <div className='container'>
      <p className='text-center fw-bold'>Nous n'avons pas tous les mêmes moyens mais sport et santé devraient être accessibles à tous, je mets donc à votre disposition <span className='text-primary'>DEUX FORMULES</span></p>
      <div className='row row-cols-1 row-cols-md-2'>
        {/* 1ere colonnes */}
        <div className='col'>
          <div className='card'>
            <img className='card-img-top w-100' alt='personal trainer fred le coach' src={personal_training} />
            <div className='card-body'>
              <h3 className='card-title text-center' style={{color: "goldenrod"}}>Personal training</h3>
              <p className='card-text' style={{textAlign: "justify"}}>Je viens à vous, directement à votre domicile ou sur n'importe quel lieu de votre choix en fonction de vos disponibiltés. Bénéficiez d'un programme personnalisé, conçu en fonction de vos besoins et de vos capacités avec un suivi physique et nutrionnel continu.
              </p>
              <div className='d-flex justify-content-center'>
                <Bouton />
              </div>
            </div>
          </div>
        </div>
        {/* 2eme ligne */}
        <div className='col'>
        <div className='card'>
            <img className='card-img-top w-100' alt='coaching en ligne fred le coach' src={coaching_ligne} />
            <div className='card-body'>
              <h3 className='card-title text-center' style={{color: "silver"}}>E-coaching</h3>
              <p className='card-text' style={{textAlign: "justify"}}>On se rencontre en ligne, au téléphone ou en visio. Nous faisons un point sur votre passé sportif ou non au moyen d'un bilan de forme. À la suite de ce rendez-vous, je vous prépare un programme sportif personnalisé évolutif en fonction de vos progrès. Bénéficiez également de conseils nutritionnels tout au long de votre coaching.
              </p>
              <div className='d-flex justify-content-center'>
                <Bouton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* ligne separation */}
      <div className="bg-dark text-light d-flex align-items-center justify-content-center " style={{height: "350px", margin: "100px 0"}}>
      <p className="display-3">Des repas sur mesures <i class="fa-solid fa-bowl-food"></i></p>
    </div>
    {/*  */}
    <div className='container' style={{marginBottom: "100px"}}>
      <div className='row row-cols-1 row-cols-md-2'>
        {/* 1ere colonnes */}
        <div className='col'>
          <p style={{textAlign: 'justify', lineHeight: "40px"}}>L'alimentation est souvent mal comprise, sous-estimée, et peut même devenir contre-productive, notamment avec des comportements restrictifs ou anorexiques lors d'un régime alimentaire. Pourtant, elle est un pilier incontournable pour atteindre vos objectifs.
          La préparation des repas peut également devenir un véritable casse-tête : savoir quoi manger, à quel moment, comment gérer un repas au restaurant ou une invitation chez des amis... Toutes ces interrogations peuvent compliquer votre parcours.
          C'est pourquoi je suis là pour vous accompagner. Je vous propose un planning de repas hebdomadaire clair et simple à suivre, conçu pour répondre à vos besoins et vous permettre d'atteindre vos objectifs sans stress ni prise de tête.
          </p>
          <Bouton />
        </div>
        {/* 2 eme colonne */}
        <div className='col'>
            <img className='card-img-top w-100 object-fit-cover' style={{maxHeight: "450px"}} alt='repas sur mesure' src={repas} />
        </div>
      </div>
    </div>

    </>
  )
}