import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md";

function App() {

  const [singleTodo, setSingleTodo] = useState({ title: "", desc: "" })
  const [allTodos, setAllTodos] = useState([])

  // const [desc, setdesc] = useState("")
  // const [title, settitle] = useState("")

  function save() {
    // setAllTodos((prev) => [...prev, singleTodo])

    if (!singleTodo.title || !singleTodo.desc) {
      alert("Fill both spaces...")
      return;
    }
    setAllTodos([...allTodos, singleTodo])
    addToLocalStorage([...allTodos, singleTodo])
    setSingleTodo({ title: "", desc: "" }); // ✅ clears inputs
  }

  function deleteTodo(i) {
    let newTodo = [...allTodos]
    newTodo.splice(i, 1)
    addToLocalStorage(newTodo)
    setAllTodos(newTodo)
    // console.log("new:", allTodos);
  }

  function clearAll(i) {
    let newTodo = []
    addToLocalStorage(newTodo)
    setAllTodos(newTodo)
    // console.log("new:", allTodos);
  }

  function addToLocalStorage(todo) {
    localStorage.setItem("todos", JSON.stringify(todo))
  }

  function getFromLocalStorage() {
    let list = JSON.parse(localStorage.getItem("todos")) || []
    setAllTodos(list)
  }

  useEffect(() => {
    getFromLocalStorage()
  }, [])

  return (
    <>
      <div className="bg-black text-white text-center min-h-screen min-w-screen overflow-hidden flex flex-col items-center gap-5 max-sm:w-full">
        <h1 className="w-150 max-sm:w-full p-10 text-3xl sm:text-5xl underline decoration-dotted">TODO-APP</h1>

        {/* <div>
        <input type="text" name="title" onChange={(e) => settitle(e.target.value)} />
        <br />
        <br />
        <input type="text" name="desc" onChange={(e) => setdesc(e.target.value)} />
        <br />
        <br />
        <button onClick={save}>Submit</button>
      </div> */}

        <div className="w-150 max-sm:w-full border-2 py-4 text-black flex flex-col items-center justify-between gap-5">
          <input className="bg-fuchsia-50 sm:text-2xl rounded-xl focus:outline-none px-4 py-2 capitalize" type="text" name="title" placeholder="Enter TODO title..."
            onChange={e => setSingleTodo((prev) => ({ ...prev, title: e.target.value }))}
            onKeyDown={(e) => { if (e.key === "Enter") save() }} />

          <input className="bg-fuchsia-50 sm:text-2xl rounded-xl focus:outline-none px-4 py-2 capitalize" type="text" name="desc" placeholder="Enter TODO desc..."
            onChange={(e) => setSingleTodo((prev) => ({ ...prev, desc: e.target.value }))}
            onKeyDown={(e) => { if (e.key === "Enter") save() }} />

          <div className="flex border-2 p-2 gap-10">
            <button className="px-3 py-2 sm:text-xl max-sm:text-sm text-center rounded-xl bg-green-400 font-semibold"
              onClick={save}>Add TODO</button>

            <button className="px-3 py-2 sm:text-xl max-sm:text-sm text-center rounded-xl bg-red-400 font-semibold"
              onClick={clearAll}>Clear All</button>
          </div>
        </div>

        <div className="w-150 max-sm:w-full allTodos p-5 flex flex-col gap-5 mb-5">
          {allTodos.map((data, i) => (
            <div className="singleTodo w-full border flex items-start justify-between py-4 px-2 gap-2 sm:text-xl">

              <div className="w-full flex gap-2 items-start">
                <h1 className="sm:text-xl">{i + 1}.</h1>

                <div className="w-full flex flex-col gap-2">
                  <h1 className="max-w-full wrap-break-word"># {data.title}</h1>
                  <h2 className="max-w-full sm:text-[16px] opacity-80 wrap-break-word">Desc: {data.desc}</h2>
                </div>
              </div>

              <button className="p-2 rounded-4xl flex items-center bg-red-500" onClick={e => { deleteTodo(i) }}><MdDelete /></button>

            </div>
          ))}
        </div >
      </div>
    </>
  )
}

export default App
