import { useNavigate } from "react-router";
import { useState } from "react";

interface PlayProps {
  totalGameCount: number;
  setTotalGameCount: (newValue: number) => void;
};

export const Play: React.FC<PlayProps> = ({
  totalGameCount: fooBarCat
  , setTotalGameCount
}) => {

  const nav = useNavigate();

  const [turnNumber, setTurnNumber] =useState(0);

    return (
      <>
        <h3 className='text-2x1 font-bold'>
          Play ({fooBarCat} games played)
        </h3>
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
        <button 
          className="btn btn-active btn-success btn-lg mt-4"
          onClick={
            () => {
              nav(-2)
              setTotalGameCount(fooBarCat + 1);
            }
          }  
        >
          Done
        </button>
      </>
    );
  };