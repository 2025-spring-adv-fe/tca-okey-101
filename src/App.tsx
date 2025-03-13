import './App.css'
import {
  HashRouter
  , Routes
  , Route
} from 'react-router';
import { AppTitle, Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { useState } from 'react';
import { GameResult, getLeaderboard } from './GameResults';

const dummyGameResults: GameResult[] = [
  {
      winner: "Hermione"
      , players: [
          "Hermione"
          , "Harry"
          , "Ron"
      ]
      , start: "2025-03-05T18:40:27.576Z"
      , end: "2025-03-05T18:45:42.576Z"
  }
];

const App = () => {
//
// Hooks...
//
  const [GameResults, setGameResults] = useState<GameResult[]>(dummyGameResults);
  //const [GameResults, setGameResults] = useState<GameResult[]>([]);

  const[title, setTitle] = useState(AppTitle);
//
// Other codes (not hooks)...
//
const addNewGameResult = (newGameResult: GameResult) => setGameResults(
  [
    ...GameResults
    , newGameResult
  ]
);


  return (
    <div 
      className='p-0'
    >
      <div 
        className="navbar bg-base-300 shadow-lg"
      >
        <h1 
          className="text-xl font-bold"
        >
          { title }
        </h1>
      </div>
      <HashRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                leaderboardData={
                  getLeaderboard(GameResults)
                }
                setTitle={setTitle}
              />
            }
          />
          <Route
            path='/Setup'
            element={
              <Setup 
                setTitle={setTitle}
              />
            }
          />
          <Route
            path='/Play'
            element={
              <Play
              addNewGameResult={addNewGameResult}
              setTitle={setTitle}
              />
            }
          />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
