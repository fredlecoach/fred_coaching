import React, { useState, useRef, useEffect } from "react";
import trainingsImage from "../styles/images/mesProgrammes.jpg";
import '../styles/css/PlanningProgram.css';

export default function PlanningProgram({
  persoTrainings,
  addProgramme,
  deleteTraining,
  addExercice,
  deleteExercice,
  modifExercice,
  updateTrainingImage,
}) {
  const [trainingForm, setTrainingForm] = useState({ programme: "", image: "" });
  const [exerciceForm, setExerciceForm] = useState({
    name: "",
    series: "",
    repetitions: "",
    poids: "",
    recuperation: "",
  });
  const [editingExercice, setEditingExercice] = useState(null);
  const [editingTraining, setEditingTraining] = useState(null);
  const [editingProgramName, setEditingProgramName] = useState(null);
  const [newProgramName, setNewProgramName] = useState("");
  const imageInputRefs = useRef({});
  const objectUrls = useRef(new Set());

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const saveImageToIndexedDB = (trainingName, base64Image) => {
    const request = indexedDB.open("TrainingImagesDB", 1);
  
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images", { keyPath: "trainingName" });
      }
    };
  
    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["images"], "readwrite");
      const store = transaction.objectStore("images");
      store.put({ trainingName, base64Image });
    };
  
    request.onerror = function (event) {
      console.error("Erreur lors de l'accès à IndexedDB", event.target.error);
    };
  };

  const loadImagesFromIndexedDB = () => {
    const request = indexedDB.open("TrainingImagesDB", 1);

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["images"], "readonly");
      const store = transaction.objectStore("images");
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = function () {
        getAllRequest.result.forEach(({ trainingName, base64Image }) => {
          updateTrainingImage(trainingName, base64Image);
        });
      };

      getAllRequest.onerror = function () {
        console.error("Erreur lors de la récupération des images depuis IndexedDB.");
      };
    };

    request.onerror = function () {
      console.error("Erreur lors de l'accès à IndexedDB");
    };
  };

  useEffect(() => {
    loadImagesFromIndexedDB();
  }, []);

  const handleImageChange = async (e) => {
    if (e.target.files?.[0]) {
      const base64Image = await convertFileToBase64(e.target.files[0]);
      setTrainingForm({ ...trainingForm, image: base64Image });
    }
  };

  const handleChangeProgramme = (e) => {
    const { name, value } = e.target;
    setTrainingForm({ ...trainingForm, [name]: value });
  };

  const handleUpdateProgramImage = async (e, trainingName) => {
    if (e.target.files?.[0]) {
      const base64Image = await convertFileToBase64(e.target.files[0]);
      updateTrainingImage(trainingName, base64Image);
      saveImageToIndexedDB(trainingName, base64Image);
    }
  };

  const handleChangeExercice = (e) => {
    const { name, value } = e.target;
    setExerciceForm({
      ...exerciceForm,
      [name]: value,
    });
  };

  const handleProgrammeSubmit = (e) => {
    e.preventDefault();
    if (!trainingForm.programme.trim()) return;
    addProgramme(trainingForm);
    setTrainingForm({ programme: "", image: "" });
  };

  const handleExerciceSubmit = (e, trainingName) => {
    e.preventDefault();
    if (editingExercice !== null) {
      modifExercice(trainingName, editingExercice, exerciceForm);
      setEditingExercice(null);
    } else {
      addExercice(trainingName, exerciceForm);
    }
    resetExerciceForm();
    setEditingTraining(null);
  };

  const resetExerciceForm = () => {
    setExerciceForm({
      name: "",
      series: "",
      repetitions: "",
      poids: "",
      recuperation: "",
    });
    setEditingExercice(null);
    setEditingTraining(null);
  };

  const startEditingExercice = (trainingName, exercice, index) => {
    setExerciceForm(exercice);
    setEditingExercice(index);
    setEditingTraining(trainingName);
  };

  const startEditingProgramName = (trainingName) => {
    setEditingProgramName(trainingName);
    setNewProgramName(trainingName);
  };

  const handleProgramNameUpdate = (oldName) => {
    if (newProgramName.trim() && newProgramName !== oldName) {
      const training = persoTrainings[oldName];
      deleteTraining(oldName);
      addProgramme({ programme: newProgramName, image: training.image || '' });
      training.exercices.forEach(exercice => addExercice(newProgramName, exercice));
    }
    setEditingProgramName(null);
  };

  const handleDeleteTraining = (trainingName) => {
    const savedImages = JSON.parse(localStorage.getItem('trainingImages') || '{}');
    if (savedImages[trainingName]) {
      URL.revokeObjectURL(savedImages[trainingName]);
      objectUrls.current.delete(savedImages[trainingName]);
      delete savedImages[trainingName];
      localStorage.setItem('trainingImages', JSON.stringify(savedImages));
    }
    deleteTraining(trainingName);
  };

  const triggerImageInput = (trainingName) => {
    imageInputRefs.current[trainingName]?.click();
  };

  const renderExerciceForm = (trainingName) => (
    <form onSubmit={(e) => handleExerciceSubmit(e, trainingName)} className="mt-3 mb-3 p-3 bg-light rounded">
      <div className="mb-2">
        <label className="form-label">Nom de l'exercice :</label>
        <input
          type="text"
          name="name"
          value={exerciceForm.name}
          onChange={handleChangeExercice}
          className="form-control"
          placeholder="squat"
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Nombre de séries :</label>
        <input
          type="number"
          name="series"
          value={exerciceForm.series}
          onChange={handleChangeExercice}
          className="form-control"
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Nombre de répétitions :</label>
        <input
          type="text"
          name="repetitions"
          value={exerciceForm.repetitions}
          onChange={handleChangeExercice}
          className="form-control"
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Charge de travail (kg) :</label>
        <input
          type="text"
          name="poids"
          value={exerciceForm.poids}
          onChange={handleChangeExercice}
          placeholder="ex : dégressif, pyramidale, 1x20 2x10"
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Temps de récupération :</label>
        <input
          type="text"
          name="recuperation"
          value={exerciceForm.recuperation}
          onChange={handleChangeExercice}
          className="form-control"
          placeholder="1 mn, 30s"
          required
        />
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {editingExercice !== null ? 'Modifier l\'exercice' : 'Ajouter l\'exercice'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={resetExerciceForm}
        >
          Annuler
        </button>
      </div>
    </form>
  );

  return (
    <div className="container mt-4">
      <div className="text-center mb-5">
        <h2><i className="fa-solid fa-dumbbell" style={{color:"goldenrod"}}></i> Plannification d'entraînements <i className="fa-solid fa-dumbbell" style={{color:"goldenrod"}}></i></h2>
      <p className="text-muted">Créez et enregistrez vos programmes d'entraînements personnalisés </p>
      </div>
      

      <form onSubmit={handleProgrammeSubmit}>
        <label style={{color:" goldenrod"}}>Nom du programme</label>
        <input
          type="text"
          name="programme"
          className="form-control mb-3"
          onChange={handleChangeProgramme}
          value={trainingForm.programme}
          placeholder="Pecs, jambes , haut du corps"
          required
        />
        <label for="illustration" style={{color:" goldenrod"}}><i className="bi bi-image fs-5"></i> Choisir une image pour illustrer votre programme</label>
        <input
          type="file"
          id="illustration"
          className="form-control mb-2"
          onChange={handleImageChange}
          accept="image/*"
          required
        />
        
        <button type="submit" className="btn btn-primary">
          Créer Programme
        </button>
      </form>

      <hr className="my-5"/>

      {/* vue des programmes */}
      <div className="row row-cols-1 bouton-program">
        {Object.entries(persoTrainings).map(([trainingName, training]) => (
          <div className="col" key={trainingName}>
            <div className="mb-5">
              <div className="position-relative">
                <div 
                  className="image-container"
                  style={{ 
                    height: "400px",
                    cursor: "pointer",
                    borderRadius: "10px 10px 0 0",
                    backgroundColor: "#f8f9fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative"
                  }}
                  onClick={() => triggerImageInput(trainingName)}
                >
                  {training.image ? (
                    <img
                      src={training.image}
                      className="w-100 h-100"
                      style={{ 
                        objectFit: "cover",
                        borderRadius: "10px 10px 0 0"
                      }}
                      alt={trainingName}
                    />
                  ) : (
                    <div className="text-center">
                      <i className="bi bi-image" style={{ fontSize: "3rem", color: "#adb5bd" }}></i>
                      <p className="mt-2 text-muted">Cliquez pour ajouter une image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={el => imageInputRefs.current[trainingName] = el}
                    className="d-none"
                    accept="image/*"
                    onChange={(e) => handleUpdateProgramImage(e, trainingName)}
                  />
                  <div 
                    className="position-absolute top-0 end-0 m-2 p-2 bg-dark bg-opacity-75 text-white rounded"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerImageInput(trainingName);
                    }}
                  >
                    <i className="bi bi-camera-fill"></i>
                  </div>
                </div>
              </div>
              <div className="p-3" style={{boxShadow: "5px 10px 30px gray", borderRadius:"0 0 10px 10px"}}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  {editingProgramName === trainingName ? (
                    <div className="d-flex gap-2 align-items-center">
                      <input
                        type="text"
                        className="form-control"
                        value={newProgramName}
                        onChange={(e) => setNewProgramName(e.target.value)}
                        onBlur={() => handleProgramNameUpdate(trainingName)}
                        onKeyPress={(e) => e.key === 'Enter' && handleProgramNameUpdate(trainingName)}
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div className="d-flex align-items-center gap-2">
                      <h5 className="card-title text-uppercase text-primary mb-0">{trainingName}</h5>
                      <button 
                        className="btn btn-link p-0 text-primary"
                        onClick={() => startEditingProgramName(trainingName)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    </div>
                  )}
                  <button 
                    onClick={() => handleDeleteTraining(trainingName)} 
                    className="btn btn-danger"
                  >
                    Supprimer le programme
                  </button>
                </div>

                <ul className="list-unstyled">
                  {training.exercices?.map((exercice, index) => (
                    <React.Fragment key={index}>
                      <li className="border-bottom py-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong className="text-uppercase d-flex flex-grow-1" style={{color:"#cd00ff"}}>{exercice.name}</strong>
                            <span style={{color: "#be8a23"}}>Séries : {exercice.series} </span>
                            <span className="text-primary d-flex flex-grow-1">Répétitions : {exercice.repetitions} </span>
                            <span className="d-flex flex-grow-1">{exercice.poids && `Charge de travail : ${exercice.poids} `}</span>
                            <span style={{color: "#519718"}} className="d-flex flex-grow-1">{exercice.recuperation && ` Récup : ${exercice.recuperation}`}</span>
                          </div>
                          <div>
                            <button 
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => startEditingExercice(trainingName, exercice, index)}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteExercice(trainingName, index)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      </li>
                      {editingExercice === index && editingTraining === trainingName && renderExerciceForm(trainingName)}
                    </React.Fragment>
                  ))}
                </ul>

                {!editingTraining && (
                  <button 
                    className="btn btn-success mt-3"
                    onClick={() => setEditingTraining(trainingName)}
                  >
                    Ajouter un exercice
                  </button>
                )}

                {editingTraining === trainingName && editingExercice === null && renderExerciceForm(trainingName)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}