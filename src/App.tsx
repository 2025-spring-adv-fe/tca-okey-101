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
import { GameResult, getLeaderboard } from './GameResults';

const dummyGameResults: GameResult[] = [
  {
      winner: "Hermione"
      , players: [
          "Hermione"
          , "Harry"
          , "Ron"
      ]
  }
  , {
      winner: "Ron"
      , players: [
          "Hermione"
          , "Ron"
      ]
  }
  , {
      winner: "Larry"
      , players: [
          "Larry"
          , "Curly"
          , "Moe"
      ]
  }
  , {
      winner: "Harry"
      , players: [
          "Curly"
          , "Harry"
      ]
  }
  , {
      winner: "Ron"
      , players: [
          "Ron"
          , "Voldemort"
      ]
  }
  , {
      winner: "Voldemort"
      , players: [
          "Ron"
          , "Voldemort"
      ]
  }
];

const App = () => {
//
// Hooks...
//
  const [GameResults, setGameResults] = useState<GameResult[]>(dummyGameResults);
  //const [GameResults, setGameResults] = useState<GameResult[]>([]);

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
          Okey 101
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
              />
            }
          />
          <Route
            path='/Setup'
            element={
              <Setup />
            }
          />
          <Route
            path='/Play'
            element={
              <Play
              addNewGameResult={addNewGameResult}
              />
            }
          />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
