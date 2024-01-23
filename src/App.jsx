
import { Link } from 'react-router-dom'
import './App.css'
import Pokedex from './components/pokedex/Pokedex'
import CustomRoutes from './customRoutes/CustomRoutes'


function App() {
  

  return (
   <>
      <h1 className='text-6xl text-center mt-11 tracking-widest text-gray-900 font-semibold hover:text-blue-500 transition duration-300 ease-in-out' >
          <Link to={'/'}>Pokedex</Link>
      </h1>
      <CustomRoutes />
   </>
  )
}

export default App
