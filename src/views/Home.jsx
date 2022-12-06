import axios from "axios"
import { useEffect, useState } from "react";
import Papa from "papaparse"
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Home = () => {
  
  const [ APIdata, setAPIdata ] = useState([])
  const [ cart, setCart ] = useState([])
  const [ loading, setLoading ] = useState(false)
  
  useEffect(() => {
    setLoading(true)

    axios.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vRUt25j0JAbKfP9-4nnemXKtOkrsbI7Ri1ssD_JAY17WpvKqAzHfQHn5Qq4M7S6a73lVU8U3Wm6f0wP/pub?output=csv",
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
    setCart((cart) => cart.concat(item))
  }

  const text = cart.reduce((message, item) => message.concat(`\n• ${item.name} - $${item.price}\n`), ``).concat(`\nTotal: ${cart.reduce((total, item) => total + item.price, 0) }`)
  
  return (
    <>
      <div className="row text-center container mx-auto">
        {
          loading ? <h4>Cargando productos...</h4> : <h3 className="my-3">Productos 🤩</h3>
        }
        {
          APIdata.map(item => (
            <div key={item.id} className="col-12 mb-3 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center">
              <Card product={item} handleAddToCart={() => handleAddToCart(item)} />
            </div>
          ))
        }
        {
          cart.length ? 
            <a href={`https://wa.me/5493512297944?text=Hola! Te paso mi lista de compra:${encodeURIComponent(text)}`} className="btn btn-primary d-grid gap-2  sticky-bottom" onClick={() => console.log(cart)}>Finalizar compra en Whatsapp - ({cart.length} productos)</a>
            : null
        }
      </div>  
    </>
  )
}
  
export default Home