import './App.css'
import {
  HashRouter
  , Routes
  , Route
} from 'react-router';
import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { useState } from 'react';



const App = () => {

  console.log(
    "App Component Func Called"
  );

const [totalGameCount, setTotalGameCount] = useState(6);

  return (
    <div className='p-4'>
      <HashRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                totalGameCount={totalGameCount}
              />
            }
          />
          <Route
            path='/Setup'
            element={
              <Setup
                totalGameCount={totalGameCount}
              />
            }
          />
          <Route
            path='/Play'
            element={
              <Play
              totalGameCount={totalGameCount} 
              setTotalGameCount={setTotalGameCount}
              />
            }
          />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
