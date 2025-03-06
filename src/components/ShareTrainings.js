import React, { useState } from 'react';

// Fonction pour générer un lien de partage
const generateShareLink = (trainingName) => {
  // Récupérer les données de l'entraînement depuis localStorage
  const persoTrainings = JSON.parse(localStorage.getItem('persoTrainings') || '{}');
  
  // Vérifier si l'entraînement existe
  if (!persoTrainings[trainingName]) {
    alert('Entraînement non trouvé');
    return null;
  }

  // Encoder les données de l'entraînement
  const encodedTraining = encodeURIComponent(
    JSON.stringify(persoTrainings[trainingName])
  );

  // Générer un lien unique
  return `${window.location.origin}/shared-training?name=${encodeURIComponent(trainingName)}&data=${encodedTraining}`;
};

// Composant pour le partage d'entraînement
export const ShareTrainingButton = ({ trainingName }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareLink = generateShareLink(trainingName);
    
    if (!shareLink) return;

    try {
      // Copier le lien dans le presse-papiers
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      
      // Réinitialiser l'état "copié" après 3 secondes
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Erreur lors de la copie du lien', err);
      alert('Impossible de copier le lien');
    }
  };

  return (
    <button 
      onClick={handleShare} 
      className="btn btn-info ms-2"
      title="Partager l'entraînement"
    >
      {copied ? 'Lien copié !' : <i className="bi bi-share"></i>}
    </button>
  );
};

// Composant pour recevoir un entraînement partagé
export const SharedTrainingReceiver = () => {
  const [sharedTraining, setSharedTraining] = useState(null);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const trainingName = urlParams.get('name');
    const trainingData = urlParams.get('data');

    if (trainingName && trainingData) {
      try {
        const decodedTraining = JSON.parse(decodeURIComponent(trainingData));
        setSharedTraining({ name: trainingName, data: decodedTraining });
      } catch (error) {
        console.error('Erreur de décodage', error);
      }
    }
  }, []);

  const handleSaveSharedTraining = () => {
    if (sharedTraining) {
      // Récupérer les entraînements existants
      const persoTrainings = JSON.parse(localStorage.getItem('persoTrainings') || '{}');
      
      // Vérifier si un programme avec ce nom existe déjà
      const uniqueName = persoTrainings[sharedTraining.name] 
        ? `${sharedTraining.name} (Copie)` 
        : sharedTraining.name;

      // Ajouter le nouvel entraînement
      persoTrainings[uniqueName] = sharedTraining.data;
      
      // Sauvegarder dans localStorage
      localStorage.setItem('persoTrainings', JSON.stringify(persoTrainings));
      
      // Rediriger ou afficher un message de succès
      alert(`Entraînement "${uniqueName}" ajouté avec succès !`);
    }
  };

  if (!sharedTraining) return null;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3>Entraînement partagé</h3>
        </div>
        <div className="card-body">
          <h4 className="card-title">{sharedTraining.name}</h4>
          <p>Un entraînement a été partagé avec vous !</p>
          <button 
            onClick={handleSaveSharedTraining} 
            className="btn btn-primary"
          >
            Enregistrer cet entraînement
          </button>
        </div>
      </div>
    </div>
  );
};