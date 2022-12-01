import axios from "axios";

export default function Api() {
  axios.get(`https://docs.google.com/spreadsheets/d/e/2PACX-1vTrxjGgjnj13Wh2Z-9peK4MfkFQmzkDTTHWON9WaFt_3zihpxacgi4PrSpDZBjcqzCLZvmD87Sym2t4/pub?gid=0&single=true&output=csv`, 
  {
    responseType: "blob"
  }
  ).then(response => {
    console.log(response.data)

    return response.data
  })
}