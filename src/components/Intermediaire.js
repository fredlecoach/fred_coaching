export default function Debutant({intermediaireProgram}) {
  return (
    <>
      <div className="container" style={{marginBottom: "100px"}}>
        <div className="row row-cols-1 row-cols-md-3">
          {intermediaireProgram.map((info) => (
            <div key={info.name}>
              <div className="card">
                <img 
                  src={info.photo} 
                  alt={info.name} 
                  className="w-100 img-fluid card-img-top object-fit-cover"
                  style={{maxHeight:"500px", minHeight:"500px"}} 
                />
                <div className="card-body">
                  <h5 className="card-title">{info.name}</h5>
                  <p className="card-text">{info.description}</p>
                  <p className="card-text">
                    Durée de l'entraînement : {info.duration} min
                  </p>
                  <p className="card-text">Niveau : <span className="text-success fw-bold" >{info.level}</span> </p>
                  <p className="card-text">Difficulté : {info.difficulty}</p>
                  <p className="card-text">Tarif : {info.price} €</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
