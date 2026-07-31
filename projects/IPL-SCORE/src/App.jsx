import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import MatchDetail from './components/MatchDetail';
import Navbar from './components/Navbar';
import PointsTable from './components/PointsTable';

function App() {

  return (
    <div className='bg-black text-white flex justify-center min-w-full min-h-screen'>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/pointsTable" element={<PointsTable />} />
          <Route path="/news" element={<h1>Coming soon...</h1>} />
          <Route path="/matchDetail/:id" element={<MatchDetail />} />
        </Route>
      </Routes>
    </div>


  )
}

export default App;





