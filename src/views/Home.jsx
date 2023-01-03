import axios from "axios"
import { useEffect, useState } from "react";
import Papa from "papaparse"
import Card from "../components/Card";
import { INFO } from "../app/constants";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";

const Home = () => {
  
  const [ APIdata, setAPIdata ] = useState([])
  const [ cart, setCart ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  useEffect(() => {
    setLoading(true)

    axios.get(INFO.sheet,
    {
      responseType: "blob"
    }
    )
    .then(response => {
      return new Promise ((resolve, reject) => {
        Papa.parse(response.data, {
          header: true,
          complete: (results) => {
            setAPIdata(results.data);
            return resolve(results.data);
          },
          error: (error) => {
            return reject(error.message);
          }
        })
        setLoading(false)
      })
      
    })
  }, [])
  
  const handleAddToCart = (item) => {
    setCart((cart) => cart.concat(item));
  }

  const text = cart.reduce((message, item) => message.concat(`\n• ${item.name} - $${item.price}`), ``).concat(`\n\nTotal: $${cart.reduce((total, item) => parseInt(total) + parseInt(item.price), 0) }`)

  let total = cart.reduce((total, item) => parseInt(total) + parseInt(item.price), 0)
  
  return (
    <>
      <div className="row text-center container mx-auto">
        {
          loading ? <h4>Cargando productos...</h4> : <h3 className="my-3">{INFO.title} 🤩</h3>
        }
        {
          APIdata.map(item => (
            <div key={item.id} className="col-12 mb-3 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center">
              <Card product={item} handleAddToCart={() => handleAddToCart(item)} />
              {
                cart.length ? 
                <div>
                  <div className="d-flex w-100">
                    <Button className="fixed-bottom m-auto w-75" variant="success" onClick={handleShow}>
                      Ver Carrito ({cart.length} productos) - ${total}
                    </Button>
                  </div>

                  <Offcanvas show={show} onHide={handleClose} className="">
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title>Carrito 🛒</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      {
                        cart.map(item => (
                          <div>
                            <div key={item.id}>{item.name} - ${item.price}
                              <button className="btn btn-primary btn-sm mx-1 my-1">+</button>

                              <button className="btn btn-danger btn-sm">-</button>
                            </div>
                          </div>
                        ))
                      }
                    </Offcanvas.Body>
                      <a className="btn btn-success" href={`https://wa.me/5493512297944?text=${encodeURIComponent(text)}`}>Finalizar compra en Whatsapp</a>
                  </Offcanvas>
                </div>
                :
                null
              }
            </div>
          ))
        }
        
      </div>
      
    </>
  )
}
  
export default Home