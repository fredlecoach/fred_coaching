import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Dietetique from './Dietetique';
import Debutant from './Debutant';
import Intermediaire from './Intermediaire';
import Avance from './Avance';
import Expert from './Expert';
import ECoaching from './E-Coaching';
import PersonalTraining from './PersonaTraining';
import Tarifs from './Tarifs';
import Panier from './Panier';
import Contact from './Contact';
import PlanningProgram from './PLanningProgramTrainings';
import { programmes, debutantProgram, intermediaireProgram, avanceProgram, expertProgram } from '../utils/Programmes';

function App() {
  const [panier, setPanier] = useState([]);
  const [total, setTotal] = useState(0);
  const prestations = [
    { name: 'programmes Débutants', tarif: 50, quantite: 1 },
    { name: 'programmes Intermédiaires', tarif: 50, quantite: 1 },
    { name: 'programmes Avancés', tarif: 50, quantite: 1 },
    { name: 'programmes Experts', tarif: 50, quantite: 1 },
    { name: 'Meal Planner', tarif: 80, quantite: 1 },
    { name: 'Home Coaching', tarif: 1300, quantite: 1 },
    { name: 'E-Coaching', tarif: 120, quantite: 1 }
  ];

  useEffect(() => {
    const newTotal = panier.reduce((acc, item) => acc + item.tarif * item.quantite, 0);
    setTotal(newTotal);
  }, [panier]);

  const addToCart = (item) => {
    setPanier(prev => {
      const existingItem = prev.find(p => p.name === item.name);
      if (existingItem) {
        return prev.map(p => (p.name === item.name ? { ...p, quantite: p.quantite + 1 } : p));
      }
      return [...prev, { ...item, quantite: 1 }];
    });
  };

  const supprimerPrestation = (name) => setPanier(panier.filter((p) => p.name !== name));
  const ajouter = (name) => setPanier(panier.map(item => item.name === name ? { ...item, quantite: item.quantite + 1 } : item));
  const diminuer = (name) => {
    setPanier(prev => {
      const updated = prev.map(item => item.name === name && item.quantite > 0 ? { ...item, quantite: item.quantite - 1 } : item);
      return updated.filter(item => item.quantite > 0);
    });
  };
  const deletePanier = () => { setPanier([]); setTotal(0); };
  const nbreArticlePanier = () => panier.reduce((total, item) => total + item.quantite, 0);
  const prixTotalPanier = () => panier.reduce((total, item) => total + item.tarif * item.quantite, 0);

  // Récupération des programmes depuis le localStorage au chargement
  const [trainings, setTrainings] = useState(() => {
    const savedTrainings = localStorage.getItem('trainings');
    return savedTrainings ? JSON.parse(savedTrainings) : {};
  });

  // Sauvegarde des programmes dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('trainings', JSON.stringify(trainings));
  }, [trainings]);

  const addTraining = (form) => {
    if (!form.programme) return;
    setTrainings(prev => ({
      ...prev,
      [form.programme]: {
        image: form.image,
        exercices: []
      }
    }));
  };

  const addExercice = (trainingName, exercice) => {
    setTrainings(prev => {
      if (!prev[trainingName]) return prev;
      return {
        ...prev,
        [trainingName]: {
          ...prev[trainingName],
          exercices: [...(prev[trainingName].exercices || []), exercice]
        }
      };
    });
  };

  const deleteTraining = (trainingName) => {
    setTrainings(prev => {
      const newPrograms = { ...prev };
      delete newPrograms[trainingName];
      return newPrograms;
    });
  };

  const deleteExercice = (trainingName, exerciceIndex) => {
    setTrainings(prev => {
      const updatedTraining = { ...prev[trainingName] };
      updatedTraining.exercices = updatedTraining.exercices.filter((_, index) => index !== exerciceIndex);
      return { ...prev, [trainingName]: updatedTraining };
    });
  };

  const modifExercice = (trainingName, exerciceIndex, updatedExercice) => {
    setTrainings(prev => {
      const updatedTraining = { ...prev[trainingName] };
      updatedTraining.exercices = updatedTraining.exercices.map((exercice, index) => 
        index === exerciceIndex ? updatedExercice : exercice
      );
      return { ...prev, [trainingName]: updatedTraining };
    });
  };

  const updateTrainingImage = (trainingName, newImage) => {
    setTrainings(prev => ({
      ...prev,
      [trainingName]: {
        ...prev[trainingName],
        image: newImage
      }
    }));
  };

  return (
    <Router>
      <Header nbreArticlePanier={nbreArticlePanier} prixTotalPanier={prixTotalPanier} />
      <Routes>
        <Route path='/' element={<Home programmes={programmes} />} />
        <Route path='/dietetique' element={<Dietetique />} />
        <Route path='/debutant' element={<Debutant debutantProgram={debutantProgram} addCart={addToCart} prestation={{ name: 'programmes Débutants', tarif: 50 }} />} />
        <Route path='/intermediaire' element={<Intermediaire intermediaireProgram={intermediaireProgram} addCart={addToCart} prestation={{ name: 'programmes Intermédiaires', tarif: 50 }} />} />
        <Route path='/avance' element={<Avance avanceProgram={avanceProgram} addCart={addToCart} prestation={{ name: 'programmes Avancés', tarif: 50 }} />} />
        <Route path='/expert' element={<Expert expertProgram={expertProgram} addCart={addToCart} prestation={{ name: 'programmes Experts', tarif: 50 }} />} />
        <Route path='/e-coaching' element={<ECoaching prestation={{ name: 'E-coaching', tarif: 120 }} addCart={addToCart} />} />
        <Route path='/personal_training' element={<PersonalTraining addCart={addToCart} prestation={{ name: 'Home coaching', tarif: 1300 }} />} />
        <Route path='/tarifs' element={<Tarifs prestations={prestations} addToCart={addToCart} ajouter={ajouter} diminuer={diminuer} panier={panier} />} />
        <Route path='/panier' element={<Panier panier={panier} total={total} deletePanier={deletePanier} supprimerPrestation={supprimerPrestation} ajouter={ajouter} diminuer={diminuer} />} />
        <Route path='/mesProgrammes' element={
          <PlanningProgram
            persoTrainings={trainings}
            addProgramme={addTraining}
            addExercice={addExercice}
            deleteExercice={deleteExercice}
            deleteTraining={deleteTraining}
            modifExercice={modifExercice}
            updateTrainingImage={updateTrainingImage}
          />
        } />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;