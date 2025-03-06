import React, { useState } from 'react';

export const ShareTrainingButton = ({ trainingName, training }) => {
  const [copied, setCopied] = useState(false);

  const generateShareLink = () => {
    // Encoder les données de l'entraînement
    const encodedTraining = encodeURIComponent(
      JSON.stringify({
        name: trainingName,
        ...training
      })
    );

    // Générer un lien unique
    return `${window.location.origin}/shared-training?training=${encodedTraining}`;
  };

  const handleShare = async () => {
    const shareLink = generateShareLink();

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

export const SharedTrainingReceiver = () => {
  const [sharedTraining, setSharedTraining] = useState(null);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedTraining = urlParams.get('training');

    if (encodedTraining) {
      try {
        const decodedTraining = JSON.parse(decodeURIComponent(encodedTraining));
        setSharedTraining(decodedTraining);
        setError(null);
      } catch (error) {
        console.error('Erreur de décodage', error);
        setError('Impossible de décoder le lien de partage');
      }
    }
  }, []);

  const handleSaveSharedTraining = () => {
    if (!sharedTraining) return;

    // Récupérer les entraînements existants depuis localStorage
    const existingTrainings = JSON.parse(localStorage.getItem('trainings') || '{}');
    
    // Générer un nom unique
    const uniqueName = generateUniqueName(sharedTraining.name, existingTrainings);

    // Créer le nouvel entraînement
    const newTraining = {
      image: sharedTraining.image || '',
      exercices: sharedTraining.exercices || []
    };

    // Mettre à jour les entraînements
    const updatedTrainings = {
      ...existingTrainings,
      [uniqueName]: newTraining
    };

    // Sauvegarder dans localStorage
    localStorage.setItem('trainings', JSON.stringify(updatedTrainings));
    
    // Rediriger ou afficher un message de succès
    alert(`Entraînement "${uniqueName}" ajouté avec succès !`);
  };

  // Fonction pour générer un nom unique
  const generateUniqueName = (originalName, existingTrainings) => {
    let newName = originalName;
    let counter = 1;

    while (existingTrainings[newName]) {
      newName = `${originalName} (Copie ${counter})`;
      counter++;
    }

    return newName;
  };

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!sharedTraining) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">Aucun entraînement à partager</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3>Entraînement partagé</h3>
        </div>
        <div className="card-body">
          <h4 className="card-title text-primary">{sharedTraining.name}</h4>
          
          {sharedTraining.image && (
            <img 
              src={sharedTraining.image} 
              alt="Programme" 
              className="img-fluid mb-3 rounded"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          )}

          <h5>Exercices :</h5>
          {sharedTraining.exercices && sharedTraining.exercices.length > 0 ? (
            <ul className="list-group">
              {sharedTraining.exercices.map((exercice, index) => (
                <li key={index} className="list-group-item">
                  <strong>{exercice.name}</strong>
                  <div className="text-muted">
                    Séries : {exercice.series} | 
                    Répétitions : {exercice.repetitions} | 
                    Récupération : {exercice.recuperation}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">Aucun exercice dans ce programme</p>
          )}

          <button 
            onClick={handleSaveSharedTraining} 
            className="btn btn-success mt-3"
          >
            Enregistrer cet entraînement
          </button>
        </div>
      </div>
    </div>
  );
};