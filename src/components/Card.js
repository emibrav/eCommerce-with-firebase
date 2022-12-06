const Card = ({product, handleAddToCart}) => {

  const { name, price, description, image } = product

  return (
    <div className="card" style={{width: "18rem"}}>
      <img src={image} className="card-img-top" alt="..." />
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="card-title">{name}</h5>
          <span className="badge bg-info">${price}</span>
        </div>
        <p className="card-text">{description}</p>
        <button onClick={handleAddToCart} className="btn btn-success">Añadir al carrito 🛒</button>
      </div>
    </div>
  )
}

export default Card
