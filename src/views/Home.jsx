import axios from "axios"
import { useEffect, useState } from "react";
import Papa from "papaparse"
import Card from "../components/Card";

const Home = () => {

  const [ APIdata, setAPIdata ] = useState([])
  const [ cart, setCart ] = useState([])

  useEffect(() => {
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
      })

    })
  }, [])

  const handleAddToCart = (item) => {
    setCart((cart) => cart.concat(item))
  }

  return (
    <>
        <h2>Productos 🤩</h2>
        <div className="row text-center ">
        {
          APIdata.map(item => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center">
              <Card product={item} handleAddToCart={() => handleAddToCart(item)} />
            </div>
          ))
        }
        </div>
    </>
  )
}
  
export default Home