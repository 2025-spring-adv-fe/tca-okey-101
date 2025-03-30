import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

interface SetupProps {
  setTitle: (t: string) => void;
  previousPlayers: string[];
  setCurrentPlayers: (players: string[]) => void;
}

export const Setup: React.FC<SetupProps> = ({
  setTitle
  , previousPlayers
  , setCurrentPlayers
}) => {

  //
  // React hooks, includes, state, effects, and others...
  //

  useEffect(
    () => setTitle("Setup")
    , []
  );
  const nav = useNavigate(); 

  const [availablePlayers, setAvailablePlayers] = useState(
    previousPlayers.map(
      x => ({
        name: x
        , checked: false
      })
    )
  );

  const [newPlayerName, setNewPlayerName] = useState("");

  //
  // Other code, for example, derived state and other calcs...
  //
  const numberOfChosenPlayers = availablePlayers.filter(x => x.checked).length;
  const fourPlayersChosen = numberOfChosenPlayers === 4;

  const duplicatePlayerName = availablePlayers.some(
    x => x.name.toUpperCase() === newPlayerName.toUpperCase()
  );
  const validateAndAddNewPlayer = () => {
    if (
      newPlayerName.length === 0
        || duplicatePlayerName
    ) {
      return;
    }
    setAvailablePlayers(
      [
        ... availablePlayers
        , {
          name: newPlayerName
          , checked: true
        }
      ].sort(
        (a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())
      )
    );

    setNewPlayerName("");
  };

  //
  // Return the JSX...
  //

    return (
      <>
        <button 
          className="btn btn-active btn-success btn-lg mt-4 w-full lg:w-64"
          onClick={
            () => {
              setCurrentPlayers(
                availablePlayers
                  .filter(
                    x => x.checked
                  )
                  .map(
                    x => (
                      x.name
                    )
                  )
              );
              nav('/play');
            }
          }  
          disabled={!fourPlayersChosen}
        >
          {
            fourPlayersChosen
              ? "Start Playing"
              : "Choose 4 Players"
          }
        </button>
        <div 
          className="mt-4 flex"
        >
          <input 
            type="text" 
            placeholder="Enter new player name..." 
            className={`input ${duplicatePlayerName ? "input-error" : ""}`}
            value={newPlayerName}
            onChange={
              (e) => setNewPlayerName(e.target.value)
            } 
          />
          <button 
            className="btn btn-outline btn-neutral ml-2"
            onClick={
              validateAndAddNewPlayer
            }
          >
            Add
          </button>
        </div>
        <div 
          className="mt-4"
        >
          {
            availablePlayers.map(
              x => (
                  <label
                    key={x.name}
                    className="block mt-2"
                  >
                    <input 
                      type="checkbox" 
                      className="checkbox mr-2"
                      checked={x.checked}
                      onChange={
                        () => setAvailablePlayers(
                          availablePlayers.map(
                            y => ({
                              name: y.name
                              , checked: y.name === x.name
                                  ? !y.checked
                                  : y.checked
                            })
                          )
                        )
                      }
                    />
                    {x.name}
                  </label>
              )
            )
          }
        </div>
      </>
    );
  };