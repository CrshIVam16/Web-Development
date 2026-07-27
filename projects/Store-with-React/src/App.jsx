
import Card from "./components/Card"
import { useState } from "react"
import data from "./utils/data"
import './index.css'
import { useEffect } from "react"

function App() {

  const [val, getVal] = useState("")
  // console.log(data);

  const [newdata, setFilterData] = useState("")
  const [initialData, setInitialData] = useState("")

  function filterHandler() {
    const res = initialData.filter(item => (item.title).toLowerCase().includes(val.toLowerCase()))
    setFilterData(res)
  }

  useEffect(() => {
    async function fetchData() {
      let res = await fetch("https://dummyjson.com/carts")
      let result = await res.json()
      // console.log(result.carts)

      //* See data.js for the reason why unique is made

      const unique = Array.from(
        new Map(
          (result.carts).flatMap(item => item.products).map(p => [p.id, p])
        ).values()
      );

      setFilterData(unique)
      setInitialData(unique)
    }
    fetchData()
  }, [])

  return (
    <div className="container">

      <h1>Raste Ka Maal Saste Mei</h1>

      <div className="search">
        <input type="text" placeholder="Search karle bhai?... " onChange={(e) => getVal(e.target.value)} onKeyDown={(e) => {
          if (e.key === "Enter") filterHandler();
        }}>
        </input>
        <button onClick={filterHandler}>Search</button>
      </div>

      <div className="cards">
        {newdata.length <= 0 ? <h2>Oops! 🙊 looks like what you are trying to find is not here yet...</h2> : <Card product={newdata} />}
      </div>
    </div >
  )
}

export default App
