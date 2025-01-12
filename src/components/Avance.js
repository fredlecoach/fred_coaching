export default function Avance({avanceProgram}) {
  return (
    <>
      <div className="container" style={{marginBottom: "100px"}}>
        <div className="row row-cols-1 row-cols-md-3">
          {avanceProgram.map((ap) => (
            <div key={ap.name}>
              <div className="card">
                <img 
                  src={ap.photo} 
                  alt={ap.name} 
                  className="w-100 img-fluid card-img-top object-fit-cover"
                  style={{maxHeight:"500px", minHeight:"500px"}} 
                />
                <div className="card-body">
                  <h5 className="card-title">{ap.name}</h5>
                  <p className="card-text">{ap.description}</p>
                  <p className="card-text">
                    Durée de l'entraînement : {ap.duration} min
                  </p>
                  <p className="card-text">Niveau : <span className="text-success fw-bold" >{ap.level}</span> </p>
                  <p className="card-text">Difficulté : {ap.difficulty}</p>
                  <p className="card-text">Tarif : {ap.price} €</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
