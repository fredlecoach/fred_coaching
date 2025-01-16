import debutant from '../styles/images/debutant.jpg';
import intermediaire from '../styles/images/intermediaire.jpg';
import avance from '../styles/images/avance.jpg';
import expert from '../styles/images/spartan.jpg';
import kickOff from "../styles/images/kickoff.jpg";
import basicBurn from "../styles/images/basicburn.jpg";
import moveEasy from "../styles/images/moveEasy.jpg"
import fitBurn from "../styles/images/jump.jpg";
import pulseUp from "../styles/images/battlleRope.jpg";
import corePower from "../styles/images/deadlift.jpg";
import kettlebell from "../styles/images/kettlebell.jpg";
import velocity from "../styles/images/velocity.jpg";
import duo from "../styles/images/duo.jpg";
import fit from "../styles/images/fit.jpg";
import ultra from "../styles/images/crossfit.jpg";
import god from "../styles/images/course.jpg"


export const programmes =[
  {id: 1, niveau: "Débutant", description: "Accessible à tous", tarif: 30, duree: "4 semaines", image: debutant, lien: "/debutant"},
  {id: 2, niveau: "Intermédiaire", description: "Avec des bonnes bases", tarif: 50, duree: "8 semaines", image: intermediaire, lien: "/intermediaire"},
  {id: 3, niveau: "Avancé", description: "En quête de performances", tarif: 80, duree: "12 semaines", image: avance, lien: "/avance"},
  {id: 4, niveau: "Expert", description: "En quête de défi", tarif: 80, duree: "16 semaines", image: expert, lien: "/expert"},
]

export const debutantProgram = [
  {
    name: "Kickoff 30",
    photo: kickOff, 
    description: "Des entraînements de 20 mn vous sont proposés à réaliser sur la semaine. Le format 30 mn vous permet de brûler un maximum de calories en un minimum de temps. Si vous avez un planning chargé, ce format est idéal.",  
    duration: 20, 
    difficulty : "🔥🔥", 
    level: "1+++",
    },
  {
    name: "Basicburn", 
    photo: basicBurn, 
    description: "Un programme d'entraînement complet axé sur la combustion des graisses et le renforcement musculaire. Des séances accessibles à tous niveaux pour sculpter votre corps et améliorer votre endurance. Parfait pour retrouver la forme à votre rythme.",  
    duration: 45, 
    difficulty : "🔥", 
    level: "1++"
  },
  {
    name: "MoveEasy", 
    photo: moveEasy, 
    description: "Un programme doux et fluide conçu pour améliorer votre mobilité, votre souplesse et réduire les tensions musculaires. Idéal pour débuter ou reprendre une activité physique en douceur, tout en favorisant le bien-être général.",  
    duration: 30, 
    difficulty : "🔥", 
    level: "1"
  }

]


export const intermediaireProgram = [
  {
    name: "Fitburn 30",
    photo: fitBurn,  // Remplace par l'image correspondante si besoin
    description: "Un programme intense de 30 minutes combinant cardio et renforcement musculaire. Parfait pour améliorer votre endurance et brûler des calories rapidement. Idéal pour ceux qui veulent passer à la vitesse supérieure.",
    duration: 30,
    difficulty: "🔥🔥",
    level: "2+",
  },
  {
    name: "Pulse Up",
    photo: pulseUp,  // Remplace par l'image correspondante si besoin
    description: "Un entraînement dynamique qui mélange exercices fonctionnels et intervalles à haute intensité. Conçu pour booster votre condition physique et renforcer vos muscles en profondeur.",
    duration: 45,
    difficulty: "🔥🔥",
    level: "2++",
  },
  {
    name: "CorePower",
    photo: corePower,  // Remplace par l'image correspondante si besoin
    description: "Un programme ciblé sur le renforcement du tronc (abdos, dos) et la stabilité corporelle. Parfait pour améliorer votre posture et prévenir les blessures tout en développant votre puissance.",
    duration: 40,
    difficulty: "🔥🔥",
    level: "2++"
  }
];


export const avanceProgram = [
  {
    name: "RageMode 30",
    photo: velocity,  // Remplace par l'image appropriée si besoin
    description: "Un programme explosif de 30 minutes combinant des exercices de haute intensité et de force. Conçu pour repousser vos limites, augmenter votre explosivité et maximiser la dépense calorique.",
    duration: 30,
    difficulty: "🔥🔥🔥",
    level: "3+",
  },
  {
    name: "FireFlex",
    photo: kettlebell,  // Remplace par l'image appropriée si besoin
    description: "Un mélange intense de renforcement musculaire et de mobilité avancée. Ce programme pousse votre souplesse et votre force fonctionnelle à leur maximum avec des mouvements complexes.",
    duration: 45,
    difficulty: "🔥🔥🔥",
    level: "3++",
  },
  {
    name: "IronCore",
    photo: duo,  // Remplace par l'image appropriée si besoin
    description: "Programme ultra-complet axé sur le renforcement du tronc et du gainage. Préparez-vous à des exercices avancés pour développer une puissance centrale et une stabilité hors normes.",
    duration: 50,
    difficulty: "🔥🔥🔥",
    level: "3++",
  }
];


export const expertProgram = [
  {
    name: "BeastMode 40",
    photo: fit,  // Remplace par l'image appropriée si besoin
    description: "Un programme d'entraînement ultra-intense de 40 minutes, conçu pour tester votre endurance, votre force et votre mental. Des exercices extrêmes pour atteindre un niveau de performance surhumain.",
    duration: 40,
    difficulty: "🔥🔥🔥🔥",
    level: "4+"
  },
  {
    name: "UltraFit",
    photo: ultra,  // Remplace par l'image appropriée si besoin
    description: "Un programme d'entraînement extrême combinant des sessions de haute intensité, de force et de puissance pour ceux qui cherchent à repousser les limites humaines. Préparez-vous à des séances intenses et complexes.",
    duration: 50,
    difficulty: "🔥🔥🔥🔥",
    level: "4++"
  },
  {
    name: "GodWar",
    photo: god,  // Remplace par l'image appropriée si besoin
    description: "Le programme ultime pour les guerriers. Un entraînement complet et brutal qui défie tous les muscles de votre corps. Des sessions de force, de résistance et de vitesse pour forger une forme physique de légende.",
    duration: 60,
    difficulty: "🔥🔥🔥🔥",
    level: "4++"
  }
];



export const prestations = [
  {id: 1, name: "E-coaching", tarif: 120},
  {id: 2, name: "Home coaching", tarif: 1300},
  {id: 3, name: "Meal planner", tarif: 60},
  {id: 4, name: "programme Débutant", tarif: 50},
  {id: 5, name: "programme Intermédaire", tarif: 50},
  {id: 6, name: "programme Avance", tarif: 50},
  {id: 7, name: "programme Expert", tarif: 50},
  ]