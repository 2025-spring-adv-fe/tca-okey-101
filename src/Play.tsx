import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { GameResult } from "./GameResults";

interface PlayProps {
  addNewGameResult: (r: GameResult) => void;
  setTitle: (t: string) => void;
  currentPlayers: string[];
};

export const Play: React.FC<PlayProps> = ({
  addNewGameResult
  , setTitle
  , currentPlayers
}) => {

  useEffect(
    () => setTitle("Play")
    , []
  );
  const nav = useNavigate();

  const [turnNumber, setTurnNumber] =useState(0);

  const [startTimestamp] = useState(
    new Date().toISOString()
  );

    return (
      <>
        <h4 className="text-lg font-semibold">
          Turn #{turnNumber}
          <button 
            className="btn btn-xs btn-outline btn-light ml-4"
            onClick={
              () => { 
                setTurnNumber(turnNumber +1);
                console.log(turnNumber);
              }
            }
          >
            +
          </button>
        </h4>
        <div 
          className="grid grid-cols-2 gap-2 mt-4"
        >
          {
            currentPlayers.map(
              x => (
                <button 
                  key={x}
                  className="btn btn-active btn-success btn-lg mt-4"
                  onClick={
                    () => {
                      addNewGameResult({
                        winner: "Barbie"
                        , players: currentPlayers
                        , start: startTimestamp
                        , end: new Date().toISOString()
                      });
                      nav(-2);
                    }
                  }  
                >
                  {x} Won!
                </button>
              )
            )
          }
        </div>
      </>
    );
  };